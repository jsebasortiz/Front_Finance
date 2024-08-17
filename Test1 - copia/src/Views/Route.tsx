import { useEffect, useState } from "react"
import RoutesTable from "../Components/Route/RouteTable/RouteTable"
import { AnimatePresence, motion } from "framer-motion"
import { Divider, Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"
import MicroRoutesTable from "../Components/Route/MicroRouteTable/MicroRouteTable"
import MicrosClientsTable from "../Components/Route/MicrosClientsTable/MicrosClientsTable"
import { RoutesPageDto } from "../types/dtoResponse/RoutesPage"
import { MicroRoutePageDto } from "../types/dtoResponse/MicroRoutePageDto"
import { ClientByMicroPageDto } from "../types/dtoResponse/ClientsPage"

function DashBoard() {
  const [routes, setRoutes] = useState<RoutesPageDto | null>(null)
  const [microRoutes, setMicroRoutes] = useState<MicroRoutePageDto | null>(null)
  const [clients, setClients] = useState<ClientByMicroPageDto | null>(null)

  const [selectedRoute, setSelectedRoute] = useState<number>(0)
  const [selectedMicroRoute, setSelectedMicroRoute] = useState<number>(0)

  useEffect(() => {
    if (selectedRoute === 0) {
      setMicroRoutes(null)
    }
    setClients(null)
  }, [selectedRoute])

  return (
    <div style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <AnimatePresence mode="popLayout">
        <article className={classes.routeArticle}>
          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Rutas</Text>

          <RoutesTable key={"RoutesTable"} tableData={routes} setTableData={setRoutes} setSelectedRoute={setSelectedRoute} />

          <motion.div layout>
            <Divider size={"xl"} mt={"xl"} />
          </motion.div>

          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Micro Rutas</Text>

          <MicroRoutesTable key={"MicroRoutes"} tableData={microRoutes} setTableData={setMicroRoutes} setMicroRouteId={setSelectedMicroRoute} selectedRoute={selectedRoute} />

          <motion.div layout>
            <Divider size={"xl"} mt={"xl"} />
          </motion.div>

          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Clientes</Text>
            <MicrosClientsTable key={"Clients"} tableData={clients} setTableData={setClients} selectedMicroRoute={selectedMicroRoute} />
        </article>
      </AnimatePresence>
    </div>
  )
}

export default DashBoard 