import { FormButton } from "../ui/form-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Poi } from "./map-widget";

export function PlaceForm({
  latLng,
  onSubmit,
  pois,
}: {
  latLng: google.maps.LatLngLiteral;
  onSubmit: (formData: FormData) => void;
  pois: Poi[];
}) {
  const selectedPoi = pois.find(
    (poi) => poi.location.lat === latLng.lat && poi.location.lng === latLng.lng,
  );
  const price = selectedPoi ? selectedPoi.price : 0;
  const name = selectedPoi ? selectedPoi.name : "";

  return (
    <form className="flex flex-col gap-y-4 flex-grow" action={onSubmit}>
      <div>
        <Label htmlFor="lat">Lat:</Label>
        <Input id="lat" name="lat" value={latLng.lat} readOnly />
      </div>
      <div>
        <Label htmlFor="lng">Lng:</Label>
        <Input id="lng" name="lng" value={latLng.lng} readOnly />
      </div>
      <div>
        <Label htmlFor="name">Name:</Label>
        <Input key={name} id="name" name="name" defaultValue={name} required />
      </div>
      <div>
        <Label htmlFor="price">Price:</Label>
        <Input
          key={String(latLng.lat) + String(latLng.lng)}
          id="price"
          name="price"
          type="number"
          defaultValue={price}
          required
        />
      </div>
      <div>
        <Label htmlFor="picture">Picture:</Label>
        <Input id="picture" name="picture" type="file" accept="image/*" />
      </div>
      <FormButton>Submit</FormButton>
    </form>
  );
}
