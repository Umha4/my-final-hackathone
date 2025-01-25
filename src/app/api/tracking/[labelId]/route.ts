import { shipengine } from "@/lib/shipengine";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  labelId: string;
}

export async function GET(
  req: NextRequest,
  context: { params: RouteParams } // Corrected type definition here
) {
  const { labelId } = context.params;

  // Validate the labelId
  if (!labelId) {
    return NextResponse.json(
      { error: "Missing required field: labelId" },
      { status: 400 }
    );
  }

  try {
    // Ensure shipengine is initialized
    if (!shipengine) {
      throw new Error("ShipEngine is not initialized");
    }

    // Track the label using ShipEngine
    const label = await shipengine.trackUsingLabelId(labelId);
    console.log("Label tracking data:", label);

    // Return the tracking data
    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    console.error("Error tracking label:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch tracking data" },
      { status: 500 }
    );
  }
}
