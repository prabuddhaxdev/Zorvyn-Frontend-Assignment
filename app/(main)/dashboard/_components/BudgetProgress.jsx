"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useState(initialBudget);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || "",
  );

  const { fn: updateBudgetFn } = useFetch(updateBudget);

  // Sync if parent updates budget (important)
  useEffect(() => {
    setBudget(initialBudget);
    setNewBudget(initialBudget?.amount?.toString() || "");
  }, [initialBudget]);

  const percentUsed = budget ? (currentExpenses / budget.amount) * 100 : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const previousBudget = budget;

    // ✅ Optimistic update
    setBudget({ ...budget, amount });
    setIsEditing(false);

    try {
      const res = await updateBudgetFn(amount);

      if (!res?.success) {
        throw new Error(res?.error || "Failed");
      }

      toast.success("Budget updated successfully");
    } catch (err) {
      // ❌ Rollback
      setBudget(previousBudget);
      toast.error("Update failed. Reverted changes.");
    }
  };

  const handleCancel = () => {
    setNewBudget(budget?.amount?.toString() || "");
    setIsEditing(false);
  };

  return (
    <Card className="border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex-1">
          <CardTitle className="text-lg font-medium text-foreground">
            Monthly Budget (Default Account)
          </CardTitle>

          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32 h-8 text-sm"
                  placeholder="Enter amount"
                  autoFocus
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  className="hover:bg-green-500/10"
                >
                  <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  className="hover:bg-red-500/10"
                >
                  <X className="h-4 w-4 text-red-500 dark:text-red-400" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription className="text-md text-muted-foreground">
                  {budget
                    ? `$${currentExpenses.toFixed(2)} of $${budget.amount.toFixed(
                        2,
                      )} spent`
                    : "No budget set"}
                </CardDescription>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 hover:bg-muted"
                >
                  <Pencil className="h-3 w-3 text-muted-foreground" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {budget && (
          <div className="space-y-2">
            <div className="relative">
              <Progress value={percentUsed} className="h-2 bg-muted" />

              {/* Overlay color bar */}
              <div
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${
                  percentUsed >= 90
                    ? "bg-red-500 dark:bg-red-400"
                    : percentUsed >= 75
                      ? "bg-yellow-500 dark:bg-yellow-400"
                      : "bg-green-500 dark:bg-green-400"
                }`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>

            <div className="flex justify-end text-xs">
              <span className="font-medium text-foreground">
                {percentUsed.toFixed(1)}% used
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
