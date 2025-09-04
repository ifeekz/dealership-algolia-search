"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/types/vehicle";
import useEncryptedImageUrl from "@/hooks/useEncryptedImageUrl";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface VehicleCardProps {
  hit: Vehicle;
}

export default React.memo(function VehicleCard({ hit }: VehicleCardProps) {
  const BLUR_PLACEHOLDER =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
  const encryptedUrl = useEncryptedImageUrl(hit.photo || "");
  const route = useRouter();

  return (
    <div className="vehicle-grid__card-wrapper">
      <Card
        className={cn(
          "rounded-xl border pt-0 text-card-foreground shadow vehicle-grid__card relative flex h-full min-h-100 max-w-[92vw] transform flex-col border-none transition duration-500  md:max-w-[380px] xl:max-w-[400px]"
        )}
      >
        {/* {hit.is_special && (
          <div className="bg-green-700 text-white text-sm font-semibold text-center py-1">
            {hit.sale_price || "Eligible for $5k Oregon Charge Ahead Rebate"}
          </div>
        )} */}
        {/* Vehicle Image */}
        <div className="relative !my-0 aspect-[3/2]">
          <Image
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: "0px",
              color: "transparent",
            }}
            src={encryptedUrl ?? "https://placehold.co/600x400"}
            alt={hit.year + " " + hit.make + " " + hit.model}
            fill
            fetchPriority={hit.__position <= 3 ? "high" : "auto"}
            loading={"lazy"}
            quality={80}
            placeholder="blur"
            className="object-cover w-full h-full rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </div>
        <div className="flex items-center justify-between px-3 ">
          <div
            className="text-[0.84rem] px-4 py-2 rounded-full bg-[#F8EBEE] text-rose-700 font-semibold"
            data-target="srp-card-mileage"
          >
            {hit.condition}
          </div>
          <p
            className="text-[0.84rem] font-normal text-[#000000]"
            data-target="srp-card-price-ask"
          >
            #{hit.stock_number}
          </p>
        </div>

        {/* Vehicle Content */}
        <div className="px-3 flex flex-col">
          <div className=" w-full pb-3">
            <h2
              data-target="srp-card-title"
              className="text-base font-medium text-[#000000] overflow-hidden line-clamp-2 text-ellipsis"
            >
              {hit.title}
            </h2>

            {/* Subtitle */}
            <p className=" text-[#72777E] text-xs line-clamp-2 text-ellipsis mb-1.5">
              {hit.body} {hit.drive_train}
            </p>
          </div>

          {/* Price Section */}
          <div className="flex items-center w-full justify-between mb-6">
            <div className="w-full">
              <div className=" text-[#69707C] overflow-hidden line-clamp-2 text-ellipsis">
                Sale Price
              </div>
              <div className="flex items-center">
                <span className="text-base font-bold text-[#374151] overflow-hidden line-clamp-2 text-ellipsis mb-1.5">
                  {hit.sale_price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }) || hit.prices.dealer_sale_price_formatted}
                </span>
                <span className="ml-2 text-gray-600">▼</span>
              </div>
            </div>

            {/* Mileage */}
            <div className="text-right">
              <div className="text-[0.84rem] font-semibold text-[#374151] whitespace-nowrap">
                {hit.mileage
                  ? `${hit.mileage.toLocaleString()} miles`
                  : "8 miles"}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className=" px-3">
            <Button
              onClick={() => route.push(`/vehicle/${hit?.objectID}`)}
              className="w-full py-6 cursor-pointer hover:bg-rose-700 text-base hover:text-white font-semibold rounded-full shadow bg-[#EFEEEE] text-gray-800 border-0"
            >
              View Details
            </Button>
          </div>
          {/* Closing tag for the div started at line 64 */}
        </div>
      </Card>
    </div>
  );
});
