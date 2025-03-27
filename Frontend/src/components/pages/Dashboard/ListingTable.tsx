import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

function ListingTable() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const { type } = useParams();
  const [items, setItems] = useState<any[]>([]);

  const buildUrl = () => {
    switch (type) {
      case "hospital":
        return {
          url: `${baseURL}/v1/api/facility/type/hospitals`,
          name: "hospitals",
        };
      case "clinic":
        return {
          url: `${baseURL}/v1/api/facility/type/clinics`,
          name: "clinics",
        };
      case "bank":
        return { url: `${baseURL}/v1/api/bank/all`, name: "bankList" };
      case "homecare":
        return { url: `${baseURL}/v1/api/homecare/all`, name: "homecareList" };
      case "transport":
        return {
          url: `${baseURL}/v1/api/transport/all`,
          name: "transportList",
        };
      case "op":
        return {
          url: `${baseURL}/v1/api/orthotics/all`,
          name: "orthoticsList",
        };
      case "diagnostics":
        return {
          url: `${baseURL}/v1/api/diagnostics/all`,
          name: "diagnosticsList",
        };
      default:
        return {
          url: `${baseURL}/v1/api/facility/type/hospitals`,
          name: "hospitals",
        };
    }
  };

  const getItems = async () => {
    const { url, name } = buildUrl();
    const response = await axios.get(url);
    const data = response.data[name];
    setItems(data);
    console.log("response data", data);
  };

  useEffect(() => {
    getItems();
  }, [type]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold capitalize">{type} Postings</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">#</TableHead>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-6"
                >
                  No Listings added yet
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <button
                      className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-500"
                      onClick={() => console.log("edit : ", item.id)}
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                      onClick={() => console.log("delete : ", item.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ListingTable;
