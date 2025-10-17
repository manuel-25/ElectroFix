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
import { formatCurrency } from '../../utils/currency';
import firmaSello from '../../assets/firmaSelloQuilmes.png';

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
    fontSize: 7,
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
    fontSize: 10,
    lineHeight: 1.3,
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 6,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 8,
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
    watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  watermarkImage: {
    width: 1000,
    opacity: 0.03,
    transform: 'rotate(-30deg)',
    margin: 40,
  },
  selloImage: {
    position: 'absolute',
    bottom: 30, // altura del sello
    right: 60,  // margen derecho
    width: 105, // tamaño del sello
    opacity: 0.90, // efecto “superpuesto”
    transform: 'rotate(-7deg)', // leve rotación como sello real
    zIndex: 10,
  },
    statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1pt solid ${COLORS.border}`,
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  statusTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginRight: 8,
  },
  statusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxBox: {
    width: 9,
    height: 9,
    border: `0.8pt solid ${COLORS.black}`,
    marginRight: 4,
  },
  statusLabel: {
    fontSize: 9,
  },
});

export function WorkOrderDocument({ service }) {
  const nombre = `${service?.userData?.firstName || ''} ${service?.userData?.lastName || ''}`;
  const articulo = [service?.equipmentType, service?.brand, service?.model].filter(Boolean).join(' ');
  const diagnostico = service?.diagnosticoTecnico || '—';
  const notas = service?.workOrderNotes || '';
  const fecha = new Date(service?.createdAt).toLocaleDateString('es-AR');
  const valorFinal = service?.finalValue ? formatCurrency(service.finalValue) : '—';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.watermarkContainer}>
            {Array.from({ length: 30 }).map((_, i) => (
                <Image key={i} src={logo} style={styles.watermarkImage} />
            ))}
        </View>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.companyCenter}>
            <Text style={{ fontWeight: 'bold' }}>CUIT: 20-38903937-1</Text>
            <Text>Quilmes: Av. Vicente López 770</Text>
            <Text>Barracas: Rocha 1752</Text>
            <Text>Lun. a Vie. de 10 a 18 hs • Sáb. de 10 a 13 hs</Text>
            <Text>Tel.: 11-3914-8766</Text>
            <Text>electrosafeservice@gmail.com</Text>
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
            <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Diagnóstico: {diagnostico}</Text>
            {notas && (
              <>
                <Text style={{ marginTop: 6 }}>Notas del técnico: {notas}</Text>
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
                  <Text style={[styles.tableCell, { width: '20%' }]}>{formatCurrency(item.precioUnitario)}</Text>
                  <Text style={{ padding: 4, width: '20%' }}>{formatCurrency(item.precioUnitario * item.cantidad)}</Text>
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
            <Text style={[styles.tableCell, { width: '80%', textAlign: 'right', fontWeight: 'bold' }]}>Total:</Text>
            <Text style={{ padding: 4, width: '20%', fontWeight: 'bold' }}>{valorFinal}</Text>
          </View>
        </View>

        {/* Estado del servicio (casillas para marcar) */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Estado del servicio:</Text>
          <View style={styles.statusOptions}>
            {['En Revisión', 'Aprobado', 'Ok Listo', 'Rechazado', 'Listo'].map((estado, i) => (
              <View key={i} style={styles.statusOption}>
                <View style={styles.checkboxBox} />
                <Text style={styles.statusLabel}>{estado}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionHeader}>Garantía: {service?.warrantyExpiration || 30} días</Text>
            <View style={{ ...styles.description, fontSize: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Prescripción de la garantía</Text>
                <Text>
                La garantía quedará sin efecto si el electrodoméstico presenta alguna de las siguientes alteraciones o condiciones:
                </Text>
                <Text>• Uso inadecuado o distinto al previsto por el fabricante</Text>
                <Text>• Desgaste normal de componentes o materiales</Text>
                <Text>• Golpes, caídas, contusiones o maltrato físico</Text>
                <Text>• Faja o sello de garantía dañado o removido</Text>
                <Text>• Presencia de residuos o líquidos en el interior del equipo</Text>
                <Text>• Daños por sobrecalentamiento, cortocircuito o variaciones eléctricas</Text>
                <Text>• Daños ocasionados por fauna (insectos, roedores u otros animales)</Text>
            </View>
        </View>

        <Text style={styles.note}>
            Nota:
            {'\n'}• El presupuesto enviado tendrá una validez de 7 (siete) días corridos desde su emisión. Vencido este plazo sin respuesta, se entenderá como rechazado.
            {'\n'}• En caso de rechazo o falta de respuesta, se deberá abonar el valor de la revisión técnica, el cual oscila entre $5.000 y $15.000 según la complejidad del equipo. El pago deberá realizarse al momento del retiro.
            {'\n'}• Si el cliente no retira el equipo dentro de los 10 (diez) días posteriores a la notificación fehaciente (WhatsApp/SMS/email), Electrosafe podrá disponer del mismo conforme al artículo 2525 del Código Civil y Comercial de la Nación.
            {'\n'}• En caso de rechazo del presupuesto, se solicita informar con anticipación para permitir el correcto ensamblaje del equipo antes de su devolución.
            {'\n'}• La aprobación del presupuesto enviada por WhatsApp u otro medio digital será considerada aceptación tácita y vinculante según la Ley 26.994 (CCC).
        </Text>

        {/* SELLO */}
        <Image src={firmaSello} style={styles.selloImage} />

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>Electrosafe - Servicio Técnico Oficial • www.electrosafe.com</Text>
          <Text style={styles.disclaimer}>Documento no válido como factura.</Text>
        </View>
      </Page>
    </Document>
  );
}

export default WorkOrderDocument;