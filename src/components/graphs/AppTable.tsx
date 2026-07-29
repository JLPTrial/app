import { DataTable } from 'react-native-paper';
import { AppText } from '../texts/AppText';

type AppTableProps = {
  header: string[],
  data: any[],
}

export default function AppTable({header, data} : AppTableProps) {
  const columns = Object.keys(data[0]);
  return (
    <DataTable>
      <DataTable.Header>
        {header.map((column : string) => (
          <DataTable.Title key={column}><AppText style={{fontSize: 15}}>{column}</AppText></DataTable.Title>
        ))}
      </DataTable.Header>

      {data.map((row,i) => (
        <DataTable.Row key={i}>
          {columns.map((column : string) => (
            <DataTable.Cell key={column}><AppText style={{fontSize: 15}}>{row[column]}</AppText></DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
}