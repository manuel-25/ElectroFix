import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import logo from '../../assets/electrosafe-logo.jpg';

Font.register({
  family: 'Helvetica',
  fonts: [{ src: 'https://fonts.gstatic.com/s/helvetica/v6/5aU19_a8oxmIfEk5UldJYA.ttf' }],
});

const COLORS = {
  gray: '#f0f0f0',
  border: '#cccccc',
  black: '#000',
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: COLORS.black,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  logo: {
    width: 120,
    height: 'auto',
    marginRight: 100,
    flexGrow: 0,
  },
  companyCenter: {
    flexGrow: 1,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 1.4,
  },
  headerRight: {
    width: 100,
    fontSize: 8,
    textAlign: 'right',
    marginTop: 5,
    fontWeight: 'bold'
  },
  fecha: {
    marginBottom: 25,
  },
  divider: {
    borderBottom: `1pt solid ${COLORS.border}`,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    letterSpacing: 1,
    borderBottom: `1pt solid ${COLORS.border}`,
    paddingBottom: 4,
  },
  section: {
    border: `1pt solid ${COLORS.border}`,
    marginBottom: 12,
  },
  sectionHeader: {
    backgroundColor: COLORS.gray,
    padding: 4,
    fontWeight: 'bold',
    fontSize: 10,
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  row: {
    flexDirection: 'row',
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  cellLabel: {
    width: '30%',
    backgroundColor: '#f9f9f9',
    fontWeight: 'bold',
    padding: 4,
  },
  cellValue: {
    width: '70%',
    padding: 4,
  },
  presupuestoHeader: {
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
    backgroundColor: COLORS.gray,
    paddingVertical: 6,
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  tableHeader: {
    flexDirection: 'row',
    fontWeight: 'bold',
    backgroundColor: COLORS.gray,
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  tableCell: {
    padding: 4,
    borderRight: `1pt solid ${COLORS.border}`,
  },
  budgetRow: {
    flexDirection: 'row',
    borderBottom: `1pt solid ${COLORS.border}`,
    fontSize: 9,
  },
  emptyMessage: {
    padding: 6,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
  },
  description: {
    padding: 6,
    fontSize: 9,
    lineHeight: 1.3,
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 6,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 7,
    lineHeight: 1.3,
    marginTop: 10,
  },
  disclaimerContainer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  disclaimer: {
    fontSize: 7,
    textAlign: 'center',
    marginTop: 2,
  },
});

export function WorkOrderDocument({ service }) {
  const nombre = `${service?.userData?.firstName || ''} ${service?.userData?.lastName || ''}`;
  const articulo = [service?.equipmentType, service?.brand, service?.model].filter(Boolean).join(' ');
  const diagnostico = service?.diagnosticoTecnico || '—';
  const notas = service?.workOrderNotes || '';
  const fecha = new Date(service?.createdAt).toLocaleDateString('es-AR');
  const valorFinal = service?.finalValue ? `$${service.finalValue}` : '—';
  const total = service.budgetItems?.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0) || 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.companyCenter}>
            <Text style={{ fontWeight: 'bold' }}>CUIT: 20-38903937-1</Text>
            <Text>Dir.: Av. Vicente López 770 - Quilmes</Text>
            <Text>Tel.: 11-3914-8766</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.fecha}>Fecha: {fecha}</Text>
            <Text>Nº control: {service?.code}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.title}>ORDEN DE TRABAJO</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Datos del cliente</Text>
          <View style={styles.row}><Text style={styles.cellLabel}>Nombre</Text><Text style={styles.cellValue}>{nombre}</Text></View>
          <View style={styles.row}><Text style={styles.cellLabel}>Teléfono</Text><Text style={styles.cellValue}>{service?.userData?.phone || '—'}</Text></View>
          <View style={styles.row}><Text style={styles.cellLabel}>Dirección</Text><Text style={styles.cellValue}>{service?.userData?.domicilio || '—'}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.presupuestoHeader}>PRESUPUESTO</Text>
          <View style={styles.description}>
            <Text style={{ fontWeight: 'bold' }}>Artículo: {articulo || '—'}</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Diagnóstico técnico: {diagnostico}</Text>
            {notas && (
              <>
                <Text style={{ fontWeight: 'bold', marginTop: 6 }}>Notas del técnico:</Text>
                <Text>{notas}</Text>
              </>
            )}
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { width: '10%' }]}>Cant.</Text>
            <Text style={[styles.tableCell, { width: '50%' }]}>Descripción</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>P. Unitario</Text>
            <Text style={{ padding: 4, width: '20%' }}>Subtotal</Text>
          </View>

          {(service.budgetItems?.length > 0) ? (
            <>
              {service.budgetItems.map((item, i) => (
                <View key={i} style={styles.budgetRow}>
                  <Text style={[styles.tableCell, { width: '10%' }]}>{item.cantidad}</Text>
                  <Text style={[styles.tableCell, { width: '50%' }]}>{item.descripcion}</Text>
                  <Text style={[styles.tableCell, { width: '20%' }]}>${item.precioUnitario}</Text>
                  <Text style={{ padding: 4, width: '20%' }}>${item.precioUnitario * item.cantidad}</Text>
                </View>
              ))}
            </>
          ) : (
            <>
              {[...Array(3)].map((_, i) => (
                <View key={i} style={styles.budgetRow}>
                  <Text style={[styles.tableCell, { width: '10%' }]}>—</Text>
                  <Text style={[styles.tableCell, { width: '50%' }]}>—</Text>
                  <Text style={[styles.tableCell, { width: '20%' }]}>—</Text>
                  <Text style={{ padding: 4, width: '20%' }}>—</Text>
                </View>
              ))}
              <Text style={styles.emptyMessage}>No se han registrado ítems presupuestados para este servicio al momento de la emisión.</Text>
            </>
          )}

          <View style={styles.budgetRow}>
            <Text style={[styles.tableCell, { width: '80%', textAlign: 'right' }]}>Valor Final:</Text>
            <Text style={{ padding: 4, width: '20%' }}>{valorFinal}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Garantía: {service?.warrantyExpiration || 30} días</Text>
          <View style={{ ...styles.description, fontSize: 7 }}>
            <Text style={{ fontWeight: 'bold' }}>Prescripción de la garantía</Text>
            <Text>La garatía queda sin efecto en caso de que el electrodoméstico presente alguna de las siguientes alteraciones:</Text>
            <Text>• Mal uso del mismo</Text>
            <Text>• Desgaste de material por uso</Text>
            <Text>• Golpes/contusiones/maltrato</Text>
            <Text>• Faja de garantía dañada</Text>
            <Text>• Residuos de líquidos en el interior</Text>
            <Text>• Sobrecalentamiento por diferencia eléctrica</Text>
          </View>
        </View>

        <Text style={styles.note}>
          Nota:
          {'\n'}Los presupuestos enviados tendrán una tolerancia de espera de respuesta de 7 (siete) días corridos, pasado este período el cliente pierde la potestad del electrodoméstico.
          {'\n'}En caso de rechazar el presupuesto, el valor de la revisión varía entre $5.000 a $15.000 dependiendo de la complejidad y tamaño del electrodoméstico. Este importe deberá ser abonado al momento de retirar el mismo, teniendo una tolerancia de espera de 7 (siete) días corridos, pasado este período el cliente pierde la potestad del electrodoméstico.
          {'\n'}Para una mejor organización de nuestro trabajo, en caso de no aceptar el presupuesto por favor avisar para poder ensamblar nuevamente el electrodoméstico para su devolución, en las mismas condiciones que ingresó.
        </Text>

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>Electrosafe - Servicio Técnico Oficial • www.electrosafe.com</Text>
          <Text style={styles.disclaimer}>Documento no válido como factura.</Text>
        </View>
      </Page>
    </Document>
  );
}

export default WorkOrderDocument;