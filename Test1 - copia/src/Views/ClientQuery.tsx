import { useEffect, useState } from "react"
import { Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"
import { AnimatePresence } from "framer-motion"
import ClientQueryTable from "../Components/ClientQueryTable/ClientQueryTable"
import { clientTestData } from "../Utils/clientData"
import { CallApiGetAllClient } from "../API/ClientCall/client"
import { PageDto } from "../types/dtoResponse/Page"

function ClientQuery() {
  const [clientQueryData, setClientQueryData] = useState(clientTestData)
  let totalPages = 0;
  let page: PageDto | null = null;
  useEffect(() => {
    // Llamada a la API y manejo de la respuesta
    CallApiGetAllClient()
      .then((data) => {
        // Verificar si los datos son válidos
        if (data) {
          // Establecer los datos en el estado
          setClientQueryData(data.content);
          totalPages = data.totalPages;
          page = data.pageable;
        } else {
          console.error("Los datos recibidos de la API son inválidos.");
        }
      })
      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
  }, []); 
  
  return (
    <main style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <AnimatePresence mode="popLayout">
        <article className={classes.routeArticle}>
          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Clientes</Text>
          <ClientQueryTable clients={clientQueryData} setClients={setClientQueryData} totalPages={totalPages} page={page} />
        </article>
      </AnimatePresence>
    </main >
  )
}

export default ClientQuery
