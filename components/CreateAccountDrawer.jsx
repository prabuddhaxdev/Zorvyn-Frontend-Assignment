"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";

export function CreateAccountDrawer() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-full cursor-pointer">
          <Card className="hover:shadow-md transition-shadow border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </div>
      </DrawerTrigger>

      <DrawerContent className="flex flex-col max-h-[85vh] lg:max-w-lg lg:mx-auto rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new account.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 px-4 pb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Name</label>
                <Input
                  placeholder="e.g., Main Checking"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Account Type */}
              <div className="space-y-2 ml-10">
                <label className="text-sm font-medium">Account Type</label>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  value={watch("type")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CURRENT">Current</SelectItem>
                    <SelectItem value="SAVINGS">Savings</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>
            </div>

            {/* Balance */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Initial Balance</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            {/* Default Switch */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <label className="text-base font-medium cursor-pointer">
                  Set as Default
                </label>
                <p className="text-sm text-muted-foreground">
                  This account will be selected by default
                </p>
              </div>
              <Switch
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="destructive" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                variant="success"
                className="flex-1"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
