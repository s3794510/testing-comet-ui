import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import React, { useMemo, memo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

const CheckTable = ({ columnsData, tableData }) => {
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          New repository
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <React.Fragment key={index}>
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      console.log("xxx", cell);
                      data = (
                        <Flex align="center">
                          <Text
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                      // } else if (cell.column.Header === "DATE") {
                      //   console.log("yyy", cell);
                      //   data = (
                      //     <Flex align="center">
                      //       <Text
                      //         me="10px"
                      //         color={textColor}
                      //         fontSize="sm"
                      //         fontWeight="700"
                      //       >
                      //         {cell.value}
                      //       </Text>
                      //     </Flex>
                      //   );
                      // }
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
                {row?.original?.files?.map((file) => (
                  <Tr key={file.name}>
                    <Td colSpan="2">
                      <Text marginLeft={4}>{`┗  ${file.name}`}</Text>
                    </Td>
                  </Tr>
                ))}
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

const TreeDirectoryTable = () => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    // {
    //   Header: "Date",
    //   accessor: "date",
    // },
  ];

  const data = [
    {
      name: "AAA",
      date: "09/09/2023",
      files: [{ name: "file1" }, { name: "file2" }],
    },
    {
      name: "BBB",
      date: "10/09/2023",
      files: [],
    },
    {
      name: "CCC",
      date: "11/09/2023",
      files: [],
    },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
              {row.original.files.map((file) => (
                <tr key={file.name}>
                  <td colSpan="2">{file.name}</td>
                </tr>
              ))}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default memo(CheckTable);
