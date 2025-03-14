
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Edit, Trash, Plus } from "lucide-react";
import { Bank } from "@shared/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Helmet } from "react-helmet";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateToLocal } from "@/lib/utils";
import { Link } from "wouter";

export default function BankManagementPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    description: "",
    established: 2000,
    minDeposit: "10000",
    website: "",
    logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    category: "bank",
    regulatedBy: "CBSL",
    status: "active",
  });
  const [error, setError] = useState("");

  // Fetch banks
  const { data: banks, isLoading } = useQuery<Bank[]>({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await fetch('/api/banks');
      if (!response.ok) {
        throw new Error('Failed to fetch banks');
      }
      return response.json();
    }
  });

  // Create bank mutation
  const createBankMutation = useMutation({
    mutationFn: async (bankData: Omit<Bank, "id" | "updatedAt">) => {
      const response = await fetch('/api/admin/banks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create bank');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      closeForm();
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  // Update bank mutation
  const updateBankMutation = useMutation({
    mutationFn: async ({ id, ...bankData }: Bank) => {
      const response = await fetch(`/api/admin/banks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update bank');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
      closeForm();
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  // Delete bank mutation
  const deleteBankMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/banks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete bank');
      }
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const openCreateForm = () => {
    setEditingBank(null);
    setFormData({
      name: "",
      shortName: "",
      description: "",
      established: 2000,
      minDeposit: "10000",
      website: "",
      logoUrl: "https://images.unsplash.com/photo-1563013544-28ae5e8cbf34?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: "bank",
      regulatedBy: "CBSL",
      status: "active",
    });
    setIsFormOpen(true);
  };

  const openEditForm = (bank: Bank) => {
    setEditingBank(bank);
    setFormData({
      name: bank.name,
      shortName: bank.shortName,
      description: bank.description,
      established: bank.established,
      minDeposit: bank.minDeposit,
      website: bank.website || "",
      logoUrl: bank.logoUrl,
      category: bank.category,
      regulatedBy: bank.regulatedBy,
      status: bank.status,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingBank(null);
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "established" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.name || !formData.shortName || !formData.description) {
      setError("Name, short name, and description are required");
      return;
    }

    if (editingBank) {
      // Update existing bank
      updateBankMutation.mutate({
        ...formData,
        id: editingBank.id,
        updatedAt: editingBank.updatedAt,
      } as Bank);
    } else {
      // Create new bank
      createBankMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this bank? This will also delete all related rates.")) {
      deleteBankMutation.mutate(id);
    }
  };

  return (
    <>
      <Helmet>
        <title>Bank Management | Admin</title>
      </Helmet>
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Bank Management
              </h1>
              <p className="text-white/90">
                Add, edit, or remove banks from the system
              </p>
            </div>
            <Button onClick={openCreateForm} className="flex items-center gap-2">
              <Plus size={16} /> Add New Bank
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banks?.map((bank) => (
              <Card key={bank.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between">
                    {bank.name}
                    <span className="text-sm text-gray-500 font-normal">
                      {bank.shortName}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {bank.description}
                  </p>
                  <div className="text-xs text-gray-500 mb-4">
                    <p>Established: {bank.established}</p>
                    <p>Min Deposit: Rs. {Number(bank.minDeposit).toLocaleString()}</p>
                    <p>Last Updated: {formatDateToLocal(new Date(bank.updatedAt))}</p>
                    <p>Status: <span className={bank.status === "active" ? "text-green-600" : "text-red-600"}>{bank.status}</span></p>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditForm(bank)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(bank.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash size={14} /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bank Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingBank ? "Edit Bank" : "Add New Bank"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Bank Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortName">Short Name</Label>
                  <Input
                    id="shortName"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="established">Established Year</Label>
                  <Input
                    id="established"
                    name="established"
                    type="number"
                    value={formData.established}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minDeposit">Minimum Deposit (Rs.)</Label>
                  <Input
                    id="minDeposit"
                    name="minDeposit"
                    value={formData.minDeposit}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  name="logoUrl"
                  value={formData.logoUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regulatedBy">Regulated By</Label>
                  <Input
                    id="regulatedBy"
                    name="regulatedBy"
                    value={formData.regulatedBy}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeForm}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createBankMutation.isPending || updateBankMutation.isPending}
                >
                  {createBankMutation.isPending || updateBankMutation.isPending 
                    ? "Saving..." 
                    : editingBank ? "Update Bank" : "Create Bank"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
