import { File, Directory, Paths } from 'expo-file-system';
import { Asset } from 'expo-asset';

export async function moveDatabase() {
  const dbDir = new Directory(Paths.document, 'SQLite');

  const dirInfo = await dbDir.info();
  if (!dirInfo.exists) {
    await dbDir.create({ intermediates: true });
  }

  const dbs = [
    { name: 'N5.db', asset: require('../../assets/data/N5/N5.db') },
  ];

  for (const { name, asset: assetModule } of dbs) {
    const dbFile = new File(dbDir, name);
    const fileInfo = await dbFile.info();

    if (!fileInfo.exists) {
      const asset = await Asset.fromModule(assetModule).downloadAsync();
      if (!asset.localUri) continue;
      const sourceFile = new File(asset.localUri);
      await sourceFile.copy(dbFile);
    }
  }
}
