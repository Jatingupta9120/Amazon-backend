import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PaginationService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) {}

    getPaginationMetadata(req: Request, total: number) {
        const query = req.query;
        const pathName = req.path;
        const page = +(query?.page ?? 1);
        const perPage = +(query?.perPage ?? 10);

        const prevLink =
            pathName +
            '/' +
            new URLSearchParams({
                ...query,
                page: `${page - 1}`,
                perPage: `${perPage}`,
            }).toString();

        const selfLink = new URLSearchParams({
            ...query,
            page: `${page}`,
            perPage: `${perPage}`,
        }).toString();

        const nextLink =
            pathName +
            '/' +
            new URLSearchParams({
                ...query,
                page: `${page + 1}`,
                perPage: `${perPage}`,
            }).toString();

        return {
            total: total,
            page: page,
            perPage: perPage,
            links: {
                prev: page == 1 ? null : prevLink,
                self: `${pathName}/${selfLink}`,
                next: total > page * perPage ? nextLink : null,
            },
        };
    }
}
