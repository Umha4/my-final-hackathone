import { ShipEngine } from 'shipengine'; // Import ShipEngine SDK
import { NextResponse } from 'next/server';

// Ensure the API key is defined
const apiKey = process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY;

if (!apiKey) {
  console.error("ShipEngine API Key is missing. Please check your environment variables.");
  throw new Error('ShipEngine API Key is missing. Please check your environment variables.');
}

// Initialize ShipEngine with the API key
const shipengine = new ShipEngine({ apiKey });

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse the request body
    const { rateId } = await req.json();

    // Validate rateId
    if (!rateId) {
      return NextResponse.json(
        { error: 'rateId is required' },
        { status: 400 }
      );
    }

    // Create a label using the rateId
    const label = await shipengine.createLabelFromRate({
      rateId, // Use `rateId` (camelCase) instead of `rate_id`
    });

    console.log('Label created successfully:', label);

    // Return the created label
    return NextResponse.json(label, { status: 200 });
  } catch (error) {
    console.error('Error creating label:', error);

    // Return a more specific error message
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while creating the label' },
      { status: 500 }
    );
  }
}