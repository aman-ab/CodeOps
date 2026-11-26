import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { DebugModule } from './debug/debug.module';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env
    RestaurantsModule, DishesModule, OrdersModule, PaymentsModule, DebugModule,
  ],
  providers: [
    // The injectable global form. NEVER useGlobalGuards(new X()): the container
    // would not construct it, so nothing could be injected.
    // GUARDS run in this order: ApiKeyGuard sets req.user, then RolesGuard reads it.
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    // INTERCEPTORS: registered first = outermost. Logging wraps Timeout, so the
    // duration it logs includes the timeout machinery (what the client actually waited for).
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Declaration order = run order. Request id first, so everything after can use it.
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
