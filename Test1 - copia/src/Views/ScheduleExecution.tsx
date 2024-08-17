import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ClientsTableDraggable from "../Components/ScheduleExecution/ClientTableDraggable/ClientTable"
import { Divider, Group, Select, Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"
import ScheduleMicroRoutesTable from "../Components/ScheduleExecution/ScheduleMicroRouteTable/ScheduleMicroRouteTable"
import type { MicroRouteType } from "../types/microRoute"
import { CallApiGetAllMicroRoutesById, CallApiGetAllRoutes } from "../API/MicroRouteCall/MicrorouteConfig"
import type { RouteType } from "../types/route"
import { ExecutedMicroRoutePageDto } from "../types/dtoResponse/ExecutionPageDto"
import { ClientByMicroPageDto } from "../types/dtoResponse/ClientsPage"

function ScheduledExecution() {
  const [routes, setRoutes] = useState<RouteType[]>([])
  const [microRoutes, setMicroRoutes] = useState<MicroRouteType[]>([])
  const [executes, setExecutes] = useState<ExecutedMicroRoutePageDto | null>(null)
  const [clients, setClients] = useState<ClientByMicroPageDto | null>(null)

  const [selectedRoute, setSelectedRoute] = useState<number>(0);
  const [selectedMicroRoute, setSelectedMicroRoute] = useState<number>(0);
  const [executedId, setExecutedId] = useState<number>(0)

  useEffect(() => {
    CallApiGetAllRoutes().then(data => {
      setRoutes(data ? data : [])
      console.log("Routes data received from API:", data)
    })

  }, [])

  useEffect(() => {
    CallApiGetAllMicroRoutesById(Number(selectedRoute)).then(data => {
      setMicroRoutes(data ? data : [])
      setExecutes(null)
      setClients(null)
      console.log("Micro Route data received from API:", data)
    })
  }, [selectedRoute])

  useEffect(() => {
    if (selectedMicroRoute == 0) {
      setExecutes(null)
    }
    setClients(null)
  }, [selectedMicroRoute])

  return (
    <div style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <article className={classes.routeArticle}>
        <Group grow p={"1rem"}>
          <Select
            data={routes.map(data => ({ label: data.routeName, value: data.routeId.toString() }))}
            label={<Text c={'black'} fs={"italic"} fw={500} ml={"xs"} mt={"xs"} size={"2rem"}>Ruta</Text>}
            placeholder='Seleccionar ruta'
            onChange={(value: string | null) => { 
              if (value !== null) {
                setSelectedMicroRoute(0)
                setSelectedRoute(Number(value));
              }
            }}
            limit={50}
            searchable
            clearable
            nothingFoundMessage="Nothing found..." />
          <Select
            data={microRoutes.map(data => ({ label: data.microRouteName, value: data.microRouteTypeId.toString() }))}
            label={<Text c={'black'} fs={"italic"} fw={500} ml={"xs"} mt={"xs"} size={"2rem"}>Micro Ruta</Text>}
            placeholder='Seleccionar micro ruta'
            onChange={(value: string | null) => {
              setExecutedId(0)
              setSelectedMicroRoute(Number(value))
            }}
            limit={50}
            searchable
            clearable
            nothingFoundMessage="Nothing found..." />
          
        </Group>
      </article>
      <AnimatePresence mode="popLayout">
        <article className={classes.routeArticle}>
          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Agendar Ejecuciones</Text>

          <ScheduleMicroRoutesTable key={"ExecutedTable"} tableData={executes} setTableData={setExecutes} setExecutedMicroRouteId={setExecutedId} selectedMicroRoute={selectedMicroRoute} />

          <motion.div layout>
            <Divider size={"xl"} mt={"xl"} />
          </motion.div>

          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Clientes</Text>
          
          <ClientsTableDraggable key={"ClientsDraggable"} clients={clients} executedId={executedId} setClients={setClients} />
        </article>
      </AnimatePresence>
    </div>
  )
}

export default ScheduledExecution 