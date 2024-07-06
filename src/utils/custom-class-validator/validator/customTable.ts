import { TableOptions, Table } from 'sequelize-typescript';
/**
 * Custom Wrapper for the Table decorator
 * @param name Name of the table (will be converted to)
 * @param tableOptions Table options
 * @param defaultOptions boolean to disable default options
 * @returns CustomTable decorator
 */
export function CustomTable(
    name: string,
    tableOptions?: TableOptions,
    defaultOptions = true,
): ClassDecorator {
    return function (target: any) {
        const mergedOptions: TableOptions = {
            tableName: camelCaseToUnderscore(name), // Applying name formatting for consistency
            ...(defaultOptions
                ? {
                      // These are the default value, add more as per requirement
                      underscored: true,
                      timestamps: true,
                      createdAt: 'created_at',
                      updatedAt: 'updated_at',
                  }
                : {}),
            ...tableOptions,
        };

        // Apply the @Table decorator with the merged options
        Table(mergedOptions)(target);
    };
}

function camelCaseToUnderscore(input: string) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
