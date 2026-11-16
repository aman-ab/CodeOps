import { Controller } from '@nestjs/common';

@Controller("orders")                    // 1 - root path /api/orders
export class OrdersController {
  constructor(
    private readonly orders: OrdersService,   // 2 - injected
  ) {}
 
  @Get()                                 // 3 - GET /api/orders
  findAll(@Query("area") area?: string) {
    return this.orders.findAll(area);
  }
 
  @Get(":id")                            // 4 - GET /api/orders/4821
  findOne(@Param("id") id: string) {
    return this.orders.find(Number(id));
  }
 
  @Post()                                // 5 - POST /api/orders
  @HttpCode(201)
  create(@Body() dto: CreateOrderDto) {
    return this.orders.create(dto)
