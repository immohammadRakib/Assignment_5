"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDaysIcon,
  HeartIcon,
  CreditCardIcon,
  ClockIcon,
  ArrowUpRight,
  CheckCircle2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stat } from "fs/promises";
import { ReviewActionButton } from "@/app/(publicGroup)/_components/properties/reviewButton";

const badgeStyles: any = {
  pending: "bg-amber-50 border-amber-200 text-amber-700",
  confirmed: "bg-emerald-50 border-emerald-200 text-emerald-700",
  rejected: "bg-rose-50 border-rose-200 text-rose-700",
  active: "bg-blue-50 border-blue-200 text-blue-700",
  paid: "bg-emerald-50 border-emerald-200 text-emerald-700",
  completed: "bg-neutral-100 border-neutral-200 text-neutral-600",
};

export default function TenantDashboard({
  rentals = [],
  payments = [],
}: {
  rentals: any[];
  payments: any[];
}) {
  return (
    <div className="space-y-8 select-none">
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Your Rental Feed History
        </h3>

        {rentals.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2 border-neutral-200 rounded-2xl bg-white">
            <p className="text-muted-foreground text-sm font-medium">
              You have no upcoming or recorded bookings.
            </p>
            <Link href="/properties">
              <Button className="mt-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-6 h-11 cursor-pointer transition active:scale-[0.98]">
                Browse Properties
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Property Stay Title</th>
                  <th className="p-4">Rental Duration Timeline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 font-semibold text-gray-700">
                {rentals.map((rental: any, index: number) => {
                  const status = (rental.status || "pending").toLowerCase();
                  const propertyId =
                    rental.property?.id ||
                    rental.property?._id ||
                    rental.propertyId;
                  const bookingId = rental.id || rental._id;

                  return (
                    <tr
                      key={bookingId || index}
                      className="hover:bg-neutral-50/20 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Home className="size-3.5 text-rose-500" />
                          <span className="font-bold text-gray-900 truncate max-w-[200px]">
                            {rental.property?.title || "Premium Rental Unit"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 text-xs font-mono">
                        {rental.startDate
                          ? new Date(rental.startDate).toLocaleDateString()
                          : "N/A"}{" "}
                        -{" "}
                        {rental.endDate
                          ? new Date(rental.endDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase ${badgeStyles[status] || badgeStyles.pending}`}
                        >
                          {rental.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {(() => {
                          if (status === "confirmed") {
                            return (
                              <Link
                                href={`/dashboard/tenant/requests/${bookingId}/pay`}
                              >
                                <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm cursor-pointer transition flex items-center gap-1 ml-auto active:scale-95">
                                  Pay Now <ArrowUpRight className="size-3.5" />
                                </button>
                              </Link>
                            );
                          }

                          if (
                            [
                              "success",
                              "valid",
                              "paid",
                              "active",
                              "completed",
                            ].includes(status)
                          ) {
                            return (
                              <ReviewActionButton
                                pID={propertyId}
                                bID={bookingId}
                                status={status}
                              />
                            );
                          }

                          if (status === "rejected") {
                            return (
                              <span className="text-[10px] text-rose-500 font-black uppercase bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                                Lease Denied
                              </span>
                            );
                          }

                          return (
                            <span className="text-[10px] text-neutral-400 italic font-bold uppercase bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-100/60 tracking-wider">
                              Awaiting Host
                            </span>
                          );
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
