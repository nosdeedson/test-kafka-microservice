import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerMessageService } from './consumer-message.service';

describe('ConsumerMessageService', () => {
  let service: ConsumerMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerMessageService],
    }).compile();

    service = module.get<ConsumerMessageService>(ConsumerMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
