import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkEvaluation } from './entity/LinkEvaluation';

@Injectable()
export class LinkEvaluationService {
  constructor(
    @InjectRepository(LinkEvaluation)
    private readonly linkEvaluationRepo: Repository<LinkEvaluation>,
  ) {}

  async create(linkEvaluation: LinkEvaluation) {
    return this.linkEvaluationRepo.save(linkEvaluation);
  }
}
