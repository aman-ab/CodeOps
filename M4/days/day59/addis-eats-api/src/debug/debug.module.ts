import { Module } from '@nestjs/common';
import { DebugController } from './debug.controller';
import { SlowService } from './slow.service';

@Module({ controllers: [DebugController], providers: [SlowService] })
export class DebugModule {}
