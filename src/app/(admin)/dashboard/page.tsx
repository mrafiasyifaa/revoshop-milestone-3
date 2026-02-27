"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/Container";
import { Title, SubTitle, SubText } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Loader, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category?: {
    id: number;
    name: string;
    image?: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

const DashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState("");
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.escuelajs.co/api/v1/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitle("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setImages("");
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title || "");
    setPrice(product.price ? product.price.toString() : "");
    setDescription(product.description || "");
    setCategoryId(product.category?.id ? product.category.id.toString() : "");
    setImages(product.images && Array.isArray(product.images) ? product.images.join(", ") : "");
    setIsModalOpen(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const imageArray = images.split(",").map((img) => img.trim()).filter((img) => img);
      
      const response = await axios.post("https://api.escuelajs.co/api/v1/products", {
        title,
        price: Number(price),
        description,
        categoryId: Number(categoryId),
        images: imageArray.length > 0 ? imageArray : ["https://placeimg.com/640/480/any"],
      });

      setProducts([response.data, ...products]);
      toast.success("Product created successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;

    try {
      const imageArray = images.split(",").map((img) => img.trim()).filter((img) => img);
      
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${editingProduct.id}`,
        {
          title,
          price: Number(price),
          description,
          categoryId: Number(categoryId),
          images: imageArray.length > 0 ? imageArray : editingProduct.images,
        }
      );

      setProducts(
        products.map((p) => (p.id === editingProduct.id ? response.data : p))
      );
      toast.success("Product updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Title>Admin Dashboard</Title>
          <SubText className="mt-2">Manage your products</SubText>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-revoshop-accent hover:bg-revoshop-accent-hover"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-8 h-8 animate-spin text-revoshop-accent" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-revoshop-navy/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.slice(0, 50).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        {product.images && product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.title || "Product"}
                            fill
                            className="object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <SubTitle className="text-sm">{product.title}</SubTitle>
                      <SubText className="text-xs line-clamp-1 mt-1">
                        {product.description}
                      </SubText>
                    </td>
                    <td className="px-6 py-4">
                      <SubTitle className="text-sm">${product.price}</SubTitle>
                    </td>
                    <td className="px-6 py-4">
                      <SubText className="text-sm">
                        {product.category?.name || "N/A"}
                      </SubText>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditModal(product)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingProduct ? "Edit Product" : "Create Product"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={editingProduct ? handleUpdate : handleCreate}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-darkColor">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Product title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-darkColor">
                    Price
                  </label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product price"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-darkColor">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product description"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-darkColor">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-darkColor">
                    Images (comma separated URLs)
                  </label>
                  <Input
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                  <SubText className="text-xs">
                    Separate multiple image URLs with commas
                  </SubText>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-revoshop-accent hover:bg-revoshop-accent-hover"
                  >
                    {editingProduct ? "Update Product" : "Create Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default DashboardPage;