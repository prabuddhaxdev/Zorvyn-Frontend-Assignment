import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";


export default async function AccountPage({ params }) {
  const { id } = await params;
  const accountData = await getAccountWithTransactions(id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        {/* Left */}
        <div>
          <h1
            className="text-3xl sm:text-5xl font-bold tracking-tight capitalize 
            bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
          >
            {account.name}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        {/* Right */}
        <div
          className="sm:text-right bg-muted/40 dark:bg-muted/20 
                        rounded-xl px-4 py-3 border border-border"
        >
          <div className="text-lg sm:text-2xl font-semibold text-green-500 dark:text-green-400">
            ${parseFloat(account.balance).toFixed(2)}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
        <Suspense
          fallback={
            <BarLoader
              className="mt-4"
              width={"100%"}
              color="#22c55e" // green-500
            />
          }
        >
          <AccountChart transactions={transactions} />
        </Suspense>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
        <Suspense
          fallback={
            <BarLoader className="mt-4" width={"100%"} color="#22c55e" />
          }
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
