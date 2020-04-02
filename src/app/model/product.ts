export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  promotion: boolean;
  selected: boolean;
  quantity: number;
  photoName: string;

 _links: {
   self: {
     href: string;
   },
   product: {
     href: string;
   },
   category: {
     href: string;
   }
 }
}
