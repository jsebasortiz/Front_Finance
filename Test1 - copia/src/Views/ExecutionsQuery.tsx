import { useEffect, useState } from "react"
import { Divider, Group, Select, Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"
import { AnimatePresence, motion } from "framer-motion"
import ExecutedMicroRoutesQueryTable from "../Components/ExecutionsQuery/ExecutedMicroRouteTable/ExecutedMicroRouteQueryTable"
import ClientsQueryTableDraggable from "../Components/ExecutionsQuery/ClientTableDraggable/ClientQueryTable"
import { ClientTypeExecution } from "../types/client"
import { MicroRouteType } from "../types/microRoute"
import { CallApiGetAllMicroRoutesById, CallApiGetAllRoutes } from "../API/MicroRouteCall/MicrorouteConfig"
import { RouteType } from "../types/route"
import { ExecutedMicroRoutePageDto } from "../types/dtoResponse/ExecutionPageDto"
import { PeriodType } from "../types/period"
import { CallApiGetAllPeriods } from "../API/PeriodCall/Period"

function ExecutionsQuery() {
  const [routes, setRoutes] = useState<RouteType[]>([])
  const [microData, setMicroData] = useState<MicroRouteType[]>([])
  const [periodData, setPeriodData] = useState<PeriodType[]>([])

  const [executionsQueryData, setExecutionsQueryData] = useState<ExecutedMicroRoutePageDto | null>(null)
  const [executedId, setExecutedId] = useState<number>(0)

  const [clientData, setClientData] = useState<ClientTypeExecution[]>([])

  const [selectedRoute, setSelectedRoute] = useState(0);
  const [selectedMicroRoute, setSelectedMicroRoute] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  useEffect(() => {
    CallApiGetAllRoutes().then(data => {
      setRoutes(data ? data : [])
      console.log("Routes data received from API:", data)
    })

  }, [])

  useEffect(() => {
    CallApiGetAllMicroRoutesById(Number(selectedRoute)).then(data => {
      setMicroData(data ? data : [])
      setExecutionsQueryData(null)
      console.log("Micro Route data received from API:", data)
    })
  }, [selectedRoute])

  useEffect(() => {
    CallApiGetAllPeriods().then(data => {
      setPeriodData(data ? data : [])

    })
  }, [])
  
  useEffect(() => {
    if (selectedMicroRoute == 0) {
      setExecutionsQueryData(null)
    }
    setClientData([])
  }, [selectedMicroRoute])

  return (
    <main style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <article className={classes.routeArticle}>
        <Group grow p={"1rem"}>
          <Select
            data={routes.map(data => ({ label: data.routeName, value: data.routeId.toString() }))}
            label='Ruta'
            placeholder='Seleccionar ruta'
            onChange={(value: string | null) => { 
              if (value !== null) {
                setSelectedMicroRoute(0)
                setSelectedRoute(Number(value));
              }
            }}
            limit={50}
            searchable
            nothingFoundMessage="Nothing found..." />
          <Select
            data={microData.map(data => ({ label: data.microRouteName, value: data.microRouteTypeId.toString() }))}
            label='Micro Ruta'
            placeholder='Seleccionar micro ruta'
            onChange={(value: string | null) => {
              setExecutedId(0)
              setSelectedMicroRoute(Number(value))
            }}
            limit={50}
            searchable
            nothingFoundMessage="Nothing found..." />
          <Select
            data={periodData.map(data => ({ label: data.name, value: data.productionPeriodId.toString() }))}
            label='Periodo'
            placeholder='Seleccionar el periodo'
            onChange={(value: string | null) => {
              setSelectedPeriod(Number(value))
            }} // Convert event to a number
            limit={50}
            searchable
            nothingFoundMessage="Nothing found..." />
        </Group>
      </article>
      <AnimatePresence mode="popLayout">
        <article className={classes.routeArticle}>
          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Ejecuciones</Text>
          <ExecutedMicroRoutesQueryTable key={"ExecutedTableQuery"} tableData={executionsQueryData} setTableData={setExecutionsQueryData} setExecutedMicroRouteId={setExecutedId} selectedMicroRoute={selectedMicroRoute} selectedPeriod={selectedPeriod}/>

          <motion.div layout>
            <Divider size={"xl"} mt={"xl"} />
          </motion.div>

          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Clientes</Text>

          <ClientsQueryTableDraggable key={"ClientTable"} clients={clientData} executedId={executedId} setClients={setClientData} />

        </article>
      </AnimatePresence>
    </main >
  )
}

export default ExecutionsQuery
