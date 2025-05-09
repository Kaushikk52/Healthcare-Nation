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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2, Zap } from "lucide-react";

function ListingTable() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const navigate = useNavigate();
  const { type } = useParams();
  const [items, setItems] = useState<any[]>([]);

  const buildUrl = () => {
    switch (type) {
      case "hospital":
        return {
          getAllUrl: `${baseURL}/v1/api/facility/type/hospitals`,
          deleteUrl: `${baseURL}/v1/api/facility/delete`,
          name: "hospitals",
        };
      case "clinic":
        return {
          getAllUrl: `${baseURL}/v1/api/facility/type/clinics`,
          deleteUrl: `${baseURL}/v1/api/facility/delete`,
          name: "clinics",
        };
      case "bank":
        return {
          getAllUrl: `${baseURL}/v1/api/bank/all`,
          deleteUrl: `${baseURL}/v1/api/bank/delete`,
          name: "bankList",
        };
      case "homecare":
        return {
          getAllUrl: `${baseURL}/v1/api/homecare/all`,
          deleteUrl: `${baseURL}/v1/api/homecare/delete`,
          name: "homecareList",
        };
      case "transport":
        return {
          getAllUrl: `${baseURL}/v1/api/transport/all`,
          deleteUrl: `${baseURL}/v1/api/transport/delete`,
          name: "transportList",
        };
      case "op":
        return {
          getAllUrl: `${baseURL}/v1/api/orthotics/all`,
          deleteUrl: `${baseURL}/v1/api/orthotics/delete`,
          name: "orthoticsList",
        };
      case "diagnostics":
        return {
          getAllUrl: `${baseURL}/v1/api/diagnostics/all`,
          deleteUrl: `${baseURL}/v1/api/diagnostics/delete`,
          name: "diagnosticsList",
        };
      case "center":
        return {
          getAllUrl: `${baseURL}/v1/api/center/all`,
          deleteUrl: `${baseURL}/v1/api/center/delete`,
          name: "center",
        };
      case "users":
        return {
          getAllUrl: `${baseURL}/v1/api/user/all`,
          deleteUrl: `${baseURL}/v1/api/user/role`,
          name: "users",
        };
      default:
        return {
          getAllUrl: `${baseURL}/v1/api/facility/type/hospitals`,
          deleteUrl: `${baseURL}/v1/api/facility/delete`,
          name: "hospitals",
        };
    }
  };

  const getItems = async () => {
    const { getAllUrl, name } = buildUrl();
    const response = await axios.get(getAllUrl);
    const data = response.data[name];
    setItems(data);
    console.log("response data", data);
  };

  const handleDelete = async (id: string) => {
    try {
      const { deleteUrl } = buildUrl();
      console.log("delete : ", id);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${deleteUrl}/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = response.data;
      console.log(data, "deleted...");
      getItems();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getItems();
  }, [type]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold capitalize">
        {type !== "users" ? `${type} Postings` : `All Users`}
      </h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">#</TableHead>
              <TableHead className="w-[150px]">Name</TableHead>
              {items.some((item) => "type" in item) && (
                <TableHead className="w-[150px]">Type</TableHead>
              )}
               {items.some((item) => "role" in item) && (
                <TableHead className="w-[150px]">Role</TableHead>
              )}
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
                  <TableCell>
                    {type !== "users"
                      ? item.name
                      : `${item.firstName} ${item.lastName}`}
                  </TableCell>
                  {items.some((item) => "type" in item) && (
                    <TableCell>{item.type}</TableCell>
                  )}
                  {items.some((item) => "role" in item) && (
                    <TableCell>{item.role}</TableCell>
                  )}
                  <TableCell className="flex items-center space-x-2">
                    {type !== "users" ? (
                      <>
                        <button
                          className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-500"
                          onClick={() =>
                            navigate(`/dashboard/${type}/edit/${item.id}`)
                          }
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-3 py-1 gap-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Pencil size={20} /> <span className="font-semibold text-base">Edit</span>
                        </button>
                      </>
                    )}
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
