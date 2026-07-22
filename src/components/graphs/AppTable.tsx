import { DataTable } from 'react-native-paper';

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
          <DataTable.Title key={column}>{column}</DataTable.Title>
        ))}
      </DataTable.Header>

      {data.map((row,i) => (
        <DataTable.Row key={i}>
          {columns.map((column : string) => (
            <DataTable.Cell key={column}>{row[column]}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
}