import { getDishById } from "../../../../lib/dishes";

export  async function GET(request,{params}){
 
    const {id} = await params;
    const dish = await getDishById(id);
    if(!dish){
        return Response.json({message:"Book not found"},{status:404});
    }   
     return Response.json(dish);
}