"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { bulkDeleteTransactions } from "@/actions/account";
import { categoryColors } from "@/data/categories";

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export function TransactionTable({ transactions }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const { loading: deleteLoading, fn: deleteFn } = useFetch(
    bulkDeleteTransactions,
  );


  const filtered = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      result = result.filter((t) =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (typeFilter) {
      result = result.filter((t) => t.type === typeFilter);
    }

    if (recurringFilter) {
      result = result.filter((t) =>
        recurringFilter === "recurring" ? t.isRecurring : !t.isRecurring,
      );
    }

    result.sort((a, b) => {
      let val = 0;
      if (sortConfig.field === "date") {
        val = new Date(a.date) - new Date(b.date);
      } else if (sortConfig.field === "amount") {
        val = a.amount - b.amount;
      } else if (sortConfig.field === "category") {
        val = a.category.localeCompare(b.category);
      }
      return sortConfig.direction === "asc" ? val : -val;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  // ✅ Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // ✅ Handlers
  const handleSort = (field) => {
    setSortConfig((curr) => ({
      field,
      direction:
        curr.field === field && curr.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((curr) =>
      curr.includes(id) ? curr.filter((i) => i !== id) : [...curr, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((curr) =>
      curr.length === paginated.length ? [] : paginated.map((t) => t.id),
    );
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} transactions?`)) return;

    try {
      await deleteFn(selectedIds);
      toast.success("Transactions deleted");
      setSelectedIds([]);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleDeleteSingle = async (id) => {
    try {
      await deleteFn([id]);
      toast.success("Transaction deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {deleteLoading && <BarLoader width={"100%"} color="#16a34a" />}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select value={recurringFilter} onValueChange={setRecurringFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Recurring" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring</SelectItem>
              <SelectItem value="non-recurring">One-time</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleBulkDelete}
            >
              <Trash className="h-4 w-4 mr-1" />({selectedIds.length})
            </Button>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <Button variant="outline" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="bg-muted/50 dark:bg-zinc-800">
              <TableHead>
                <Checkbox
                  checked={
                    selectedIds.length === paginated.length &&
                    paginated.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>

              <TableHead
                onClick={() => handleSort("date")}
                className="cursor-pointer"
              >
                Date
              </TableHead>

              <TableHead>Description</TableHead>

              <TableHead
                onClick={() => handleSort("category")}
                className="cursor-pointer"
              >
                Category
              </TableHead>

              <TableHead
                onClick={() => handleSort("amount")}
                className="text-right cursor-pointer"
              >
                Amount
              </TableHead>

              <TableHead>Recurring</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((t) => (
                <TableRow
                  key={t.id}
                  className="hover:bg-green-600/5 dark:hover:bg-green-400/10"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(t.id)}
                      onCheckedChange={() => handleSelect(t.id)}
                    />
                  </TableCell>

                  <TableCell>{format(new Date(t.date), "PP")}</TableCell>

                  <TableCell className="max-w-[200px] truncate">
                    {t.description}
                  </TableCell>

                  <TableCell>
                    <span
                      style={{ background: categoryColors[t.category] }}
                      className="px-2 py-1 rounded text-xs text-white"
                    >
                      {t.category}
                    </span>
                  </TableCell>

                  <TableCell
                    className={cn(
                      "text-right font-semibold",
                      t.type === "EXPENSE"
                        ? "text-red-500"
                        : "text-green-600 dark:text-green-400",
                    )}
                  >
                    {t.type === "EXPENSE" ? "-" : "+"}${t.amount.toFixed(2)}
                  </TableCell>

                  <TableCell>
                    {t.isRecurring ? (
                      <Badge className="bg-green-600/10 text-green-600 dark:bg-green-400/20 dark:text-green-400">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        {RECURRING_INTERVALS[t.recurringInterval]}
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        One-time
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/transaction/create?edit=${t.id}`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDeleteSingle(t.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>

          <Button
            size="icon"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
