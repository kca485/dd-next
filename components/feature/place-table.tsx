"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Poi } from "./map-widget";
import { useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";

interface PlaceTableProps {
  onNameClick(latLng: google.maps.LatLngLiteral): void;
  pois: Poi[];
}
export function PlaceTable({ pois, onNameClick }: PlaceTableProps) {
  const [data, setData] = useState(pois);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const map = useMap();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    let query = "";
    if ((e.target as HTMLFormElement).method) {
      const formData = new FormData(e.target as HTMLFormElement);
      query = formData.get("search")?.toString().toLowerCase() ?? "";
    } else {
      query = (e.target as HTMLInputElement).value;
    }

    if (!query) {
      setData(pois);
    } else {
      setData(pois.filter((poi) => poi.name.toLowerCase().includes(query)));
    }
  }

  function handleNameClick(latLng: google.maps.LatLngLiteral) {
    if (!map) return;
    map.panTo(latLng);
    onNameClick?.(latLng);
  }

  function handleSort(key: "name" | "price") {
    const sortedData = data.toSorted((a, b) => {
      if (order === "desc") {
        setOrder("asc");
        return a[key] > b[key] ? 1 : -1;
      }
      setOrder("desc");
      return a[key] > b[key] ? -1 : 1;
    });

    setData(sortedData);
  }

  return (
    <div className="space-y-2">
      <search>
        <form className="flex items-end gap-x-2" onSubmit={handleSearch}>
          <div className="flex-grow">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              id="search"
              name="search"
              type="search"
              onInput={handleSearch}
            />
          </div>
          <Button variant="outline">Search</Button>
        </form>
      </search>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button onClick={() => handleSort("name")} variant="link">
                Name
              </Button>
            </TableHead>
            <TableHead className="w-[150px] text-right">
              <Button onClick={() => handleSort("price")} variant="link">
                Price
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((datum) => (
            <TableRow key={datum.id}>
              <TableCell>
                <Button
                  variant="link"
                  onClick={() => handleNameClick(datum.location)}
                >
                  {datum.name}
                </Button>
              </TableCell>
              <TableCell className="flex justify-between">
                {formatPrice(datum.price)
                  .split(/\s+/)
                  .map((part) => (
                    <span key={part}>{part}</span>
                  ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
