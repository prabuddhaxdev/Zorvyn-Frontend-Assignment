import { CreateAccountDrawer } from "@/components/CreateAccountDrawer";
import { Button } from "@/components/ui/button";
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <CreateAccountDrawer>
        <Button variant="success">Create Account</Button>
      </CreateAccountDrawer>
    </div>
  );
};

export default Dashboard;
