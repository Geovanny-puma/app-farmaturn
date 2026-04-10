import dataSource from './data-source';

async function getExecutedMigrationsCount(): Promise<number> {
  try {
    const result: Array<{ count: number | string }> = await dataSource.query(
      'SELECT COUNT(*)::int AS count FROM "migrations"',
    );

    return Number(result[0]?.count ?? 0);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '42P01'
    ) {
      return 0;
    }

    throw error;
  }
}

async function revertAllMigrations(): Promise<void> {
  await dataSource.initialize();

  try {
    let pendingReverts = await getExecutedMigrationsCount();

    while (pendingReverts > 0) {
      await dataSource.undoLastMigration({ transaction: 'all' });
      pendingReverts = await getExecutedMigrationsCount();
    }
  } finally {
    await dataSource.destroy();
  }
}

void revertAllMigrations().catch((error) => {
  console.error(error);
  process.exit(1);
});
