// components/CustomTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataNotAvailable } from './DataNotAvailable';

interface CustomTableProps {
  headers: { key: string; label: string }[]; // Array of objects with key and label for headers
  rows: Record<string, any>[]; // Array of key-value pairs (objects) representing the rows
  actions?: (row: Record<string, any>) => React.ReactNode; // Optional action column generator function
}

export function CustomTable({ headers, rows, actions }: CustomTableProps) {
  return (
    <Table className="max-h-96 w-full">
      <TableHeader className="bg-muted text-primary">
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header.label}</TableHead>
          ))}
          {actions && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      {
        rows.length ?
        <TableBody className="overflow-y-auto">
          { rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <TableCell key={cellIndex}>
                  {/* Render image for coverImage key, otherwise render text */}
                  {header.key === 'coverImage' ? (
                    <img
                      alt={row['title']}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={row[header.key]}
                      width="64"
                    />
                  ) : (
                    row[header.key]
                  )}
                </TableCell>
              ))}
              {actions && (
                <TableCell>{actions(row)}</TableCell>
              )}
            </TableRow>
          )) 
          }
        </TableBody>:
        <DataNotAvailable/>
      }
    </Table>
  );
}
