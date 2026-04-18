import { CreateAccountDrawer } from "@/components/CreateAccountDrawer";
import React from "react";
import { AccountCard } from "./_components/AccountCard";
import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { BudgetProgress } from "./_components/BudgetProgress";
import { DashboardOverview } from "./_components/TransactionOverview";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

      <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <CreateAccountDrawer>
          <Card className="flex items-center justify-center cursor-pointer hover:border-dashed hover:border-primary transition">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Plus className="h-6 w-6 mb-2" />
              <p className="text-sm font-medium">Add Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
};

