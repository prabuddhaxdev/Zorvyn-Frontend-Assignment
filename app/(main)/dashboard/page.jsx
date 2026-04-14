import { CreateAccountDrawer } from "@/components/CreateAccountDrawer";
import React from "react";
import { AccountCard } from "./_components/AccountCard";
import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { BudgetProgress } from "./_components/BudgetProgress";

export default async function Dashboard() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);
  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <CreateAccountDrawer />
        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
};

