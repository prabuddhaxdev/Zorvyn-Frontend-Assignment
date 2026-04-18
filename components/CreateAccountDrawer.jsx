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

export function CreateAccountDrawer({
  children,
  onAccountCreated,
  open: controlledOpen,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

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
    loading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created");

      onAccountCreated?.(newAccount);

      reset();
      setOpen(false);
    }
  }, [newAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Trigger (only if children passed) */}
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}

      <DrawerContent className="max-h-[85vh] lg:max-w-lg lg:mx-auto rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle>Create Account</DrawerTitle>
          <DrawerDescription>
            Add a new account to track your finances
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Account name" {...register("name")} />

              <Select
                onValueChange={(v) => setValue("type", v)}
                value={watch("type")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              type="number"
              step="0.01"
              placeholder="Initial balance"
              {...register("balance")}
            />

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <span className="text-sm">Set as default</span>
              <Switch
                checked={watch("isDefault")}
                onCheckedChange={(v) => setValue("isDefault", v)}
              />
            </div>

            <div className="flex gap-3">
              <DrawerClose asChild>
                <Button variant="destructive" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button type="submit" variant="success" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
