"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { PRODUCTS as defaultProducts } from "../data/products";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Լսում ենք Firestore-ի "products" collection-ի փոփոխությունները
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedProducts = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setProducts(fetchedProducts);
      } else {
        // Եթե բազան դեռ դատարկ է, ցույց տանք սկզբնական mock տվյալները
        setProducts(defaultProducts);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setProducts(defaultProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 1. Ավելացնել նոր ապրանք Firestore-ում
  const addProduct = async (product) => {
    try {
      await addDoc(collection(db, "products"), {
        ...product,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // 2. Խմբագրել ապրանքը
  const updateProduct = async (id, updatedData) => {
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, updatedData);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  // 3. Ջնջել ապրանքը
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}