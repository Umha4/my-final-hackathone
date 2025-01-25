import { shipengine } from "@/lib/shipengine";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { labelId: string } } // Corrected params type
) {
  const { labelId } = params;

  if (!labelId) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    // Ensure shipengine is initialized
    if (!shipengine) {
      throw new Error("ShipEngine is not initialized");
    }

    // Track the label using ShipEngine
    const label = await shipengine.trackUsingLabelId(labelId);
    console.log(label);

    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    console.error("Error tracking label:", error);

    // Return a generic error message
    return new Response(
      JSON.stringify({ error: "Failed to fetch tracking data" }),
      {
        status: 500,
      }
    );
  }
}












// // import { shipengine } from "@/lib/shipengine";
// // import { NextRequest, NextResponse } from "next/server";

// // export async function GET(
// //   req: NextRequest,
// //   {
// //     params,
// //   }: {
// //     params: Promise<{ labelId: string }>;
// //   }
// // ) {
// //   const labelId = (await params).labelId;
// //   if (!labelId) {
// //     return new Response(JSON.stringify({ error: "Missing required fields" }), {
// //       status: 400,
// //     });
// //   }

// //   try {
// //     const label = await shipengine.trackUsingLabelId(labelId);
// //     console.log(label);

// //     return NextResponse.json(label, { status: 200 });
// //   } catch (error) {
// //     console.log(error);
// //     return new Response(JSON.stringify({ error: error }), {
// //       status: 500,
// //     });
// //   }
// // }
