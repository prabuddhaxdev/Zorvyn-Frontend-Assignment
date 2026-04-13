"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card
      className="
      hover:shadow-lg transition-all duration-200 group relative
      bg-white dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-800
      rounded-2xl
    "
    >
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-5">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </p>
            <CardTitle className="text-base font-semibold capitalize text-zinc-800 dark:text-zinc-100">
              {name}
            </CardTitle>
          </div>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>

        <CardContent className="px-5 pb-4">
          <div className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            ${parseFloat(balance).toFixed(2)}
          </div>
          {isDefault && (
            <span className="mt-1 inline-block text-xs font-medium text-green-600 dark:text-green-400">
              ✦ Default Account
            </span>
          )}
        </CardContent>

        <CardFooter
          className="
          flex justify-between
        "
        >
          <div className="flex items-center mt-3">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
