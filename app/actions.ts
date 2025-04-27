interface PlaceBody {
  lat: number;
  lng: number;
  price: number;
}
export async function addPlace(body: PlaceBody) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function editPlace(body: PlaceBody, id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function deletePlace(id: number) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/place/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
