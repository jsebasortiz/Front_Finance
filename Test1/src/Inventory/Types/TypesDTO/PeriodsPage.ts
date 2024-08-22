import { InventoryTypes } from "../Inventory";
import { PageDto } from "../TypesDTO/Page";

export interface PeriodsPageDto{
    content: InventoryTypes[],
    pageable: PageDto,
    numberOfelements: number,
    totalPages:number
}