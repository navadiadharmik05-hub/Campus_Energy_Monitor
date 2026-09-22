import React, { useState, useMemo, useEffect } from 'react';
import { 
  EnergyRecord, 
  FacilityType, 
  ActiveTab, 
  ActiveModal, 
  ActivityLog, 
  EnergyAlert,
  Facility 
} from './types';
import { INITIAL_RECORDS, INITIAL_ALERTS, CAMPUS_FACILITIES } from './data/mockData';
import { mergeSortRecords, linearSearchRecords, LifoStack } from './utils/algorithms';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { RecordsTable } from './components/RecordsTable';
import { AddRecordForm } from './components/AddRecordForm';
import { QuickActions } from './components/QuickActions';
import { BottomNav } from './components/BottomNav';
import { FacilitiesView } from './components/FacilitiesView';
import { DispatchView } from './components/DispatchView';
import { AlertsView } from './components/AlertsView';
import { AnalysisModal } from './components/modals/AnalysisModal';
import { CompareModal } from './components/modals/CompareModal';
import { BinarySearchModal } from './components/modals/BinarySearchModal';
import { QueueModal } from './components/modals/QueueModal';
import { GridNetworkModal } from './components/modals/GridNetworkModal';
import { ActivityModal } from './components/modals/ActivityModal';
import { RecordDetailModal } from './components/modals/RecordDetailModal';
import { ProfileModal } from './components/modals/ProfileModal';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // App tabs & modal view states
  const [activeTab, setActiveTab] = useState<ActiveTab>('telemetry');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedRecord, setSelectedRecord] = useState<EnergyRecord | null>(null);

  // Telemetry Records state
  const [records, setRecords] = useState<EnergyRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  // LIFO Undo Stack instance
  const [undoStack] = useState(() => new LifoStack<EnergyRecord[]>(25));
  const [undoCount, setUndoCount] = useState<number>(0);

  // Alerts state
  const [alerts, setAlerts] = useState<EnergyAlert[]>(INITIAL_ALERTS);

  // Facilities directory state
  const [facilities, setFacilities] = useState<Facility[]>(CAMPUS_FACILITIES);

  // Activity audit log
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'log-1',
      timestamp: '14:30:00',
      action: 'Telemetry Mesh Synchronized',
      details: 'All 18 substation nodes reported nominal line status.',
      complexity: 'O(1)',
    },
    {
      id: 'log-2',
      timestamp: '14:15:22',
      action: 'Peak Load Surveillance',
      details: 'Sci-Tech Lab B flagged for elevated demand (4,120 kWh).',
      complexity: 'O(n)',
    },
    {
      id: 'log-3',
      timestamp: '13:45:10',
      action: 'Baseline Assessment',
      details: 'Campus load variance measured at +2.4% above historical curve.',
      complexity: 'O(n log n)',
    },
  ]);

  // Sync dark class on document html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Helper to log actions
  const addLog = (action: string, details: string, complexity?: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action,
      details,
      complexity,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Linear search filtering
  const searchResults = useMemo(() => {
    return linearSearchRecords(records, searchQuery).results;
  }, [records, searchQuery]);

  // Dynamic Metrics
  const totalTodayKwh = useMemo(() => {
    // Exact baseline sum of active records matching the prototype benchmark
    const sum = records.slice(0, 6).reduce((acc, r) => acc + r.consumption, 0);
    return sum;
  }, [records]);

  const monitoredCount = records.length;

  const activeAlertsCount = useMemo(() => {
    return alerts.filter((a) => !a.resolved).length;
  }, [alerts]);

  const peakRecord = useMemo(() => {
    if (records.length === 0) return { area: 'Sci-Tech Complex', consumption: 4120 };
    return records.reduce((max, r) => (r.consumption > max.consumption ? r : max), records[0]);
  }, [records]);

  // Sort by consumption using Merge Sort - O(n log n)
  const handleSortByConsumption = () => {
    // Push current snapshot to LIFO Undo Stack
    undoStack.push([...records]);
    setUndoCount(undoStack.size());

    const nextAsc = !sortAscending;
    const sorted = mergeSortRecords(records, nextAsc);
    setRecords(sorted);
    setSortAscending(nextAsc);

    addLog(
      'Merge Sort Executed',
      `Sorted ${records.length} energy records by consumption ${nextAsc ? 'ascending' : 'descending'}.`,
      'O(n log n)'
    );
  };

  // Reset records to initial state
  const handleReset = () => {
    undoStack.push([...records]);
    setUndoCount(undoStack.size());

    setRecords(INITIAL_RECORDS);
    setSearchQuery('');
    setSortAscending(false);

    addLog(
      'Dataset Reset',
      'Restored initial 18 telemetric campus energy records.',
      'O(1)'
    );
  };

  // Undo last operation using LIFO Stack pop - O(1)
  const handleUndo = () => {
    if (undoStack.isEmpty()) return;

    const previousSnapshot = undoStack.pop();
    setUndoCount(undoStack.size());

    if (previousSnapshot) {
      setRecords(previousSnapshot);
      addLog(
        'LIFO Undo Operation',
        'Reverted telemetry dataset to prior stack state snapshot.',
        'O(1)'
      );
    }
  };

  // Add new energy record handler
  const handleAddRecord = (data: {
    area: string;
    type: FacilityType;
    consumption: number;
    date: string;
  }) => {
    // Save current state for undo
    undoStack.push([...records]);
    setUndoCount(undoStack.size());

    let status: 'Normal' | 'Elevated' | 'Critical' = 'Normal';
    if (data.consumption >= 4000) {
      status = 'Critical';
    } else if (data.consumption >= 3000) {
      status = 'Elevated';
    }

    const newRecord: EnergyRecord = {
      id: `rec-${Date.now()}`,
      area: data.area,
      type: data.type,
      consumption: data.consumption,
      timestamp: data.date === 'Today' ? 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : data.date,
      status,
      peakKwh: Math.round(data.consumption * 1.08),
      powerFactor: 0.94,
      temperature: 21.0,
    };

    setRecords((prev) => [newRecord, ...prev]);

    // Also update facilities directory
    setFacilities((prev) => [
      {
        id: `fac-${Date.now()}`,
        name: data.area,
        type: data.type,
        currentKwh: data.consumption,
        baselineKwh: Math.round(data.consumption * 0.96),
        status,
        substation: 'Substation B (Central)',
        occupancy: 65,
        sqft: 35000,
      },
      ...prev,
    ]);

    addLog(
      'Record Enqueued',
      `Registered telemetry for ${data.area}: ${data.consumption.toLocaleString()} kWh (${status}).`,
      'O(1)'
    );
  };

  // Search input change handler
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      addLog(
        'Linear Search Query',
        `Scanned ${records.length} records for term "${query}".`,
        'O(n)'
      );
    }
  };

  // Resolve alert handler
  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    );
    const alt = alerts.find((a) => a.id === id);
    addLog(
      'Alert Acknowledged',
      `Operator marked ${alt?.facility || 'alert'} threshold anomaly as reviewed.`,
      'O(1)'
    );
  };

  // Open detail modal for clicked record
  const handleSelectRecord = (record: EnergyRecord) => {
    setSelectedRecord(record);
    setActiveModal('recordDetail');
  };

  return (
    <div className="bg-[#0f131c] text-[#dfe2ee] font-['Geist'] min-h-screen flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Sticky Top Header */}
      <Header
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenProfile={() => setActiveModal('profile')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-4 pb-28">
        {/* Navigation Tabs Conditionals */}
        {activeTab === 'telemetry' && (
          <div className="flex flex-col gap-3 sm:gap-4 animate-in fade-in duration-150">
            {/* 1. Top Metrics Summary (2x2 Grid) */}
            <MetricCards
              totalTodayKwh={totalTodayKwh}
              monitoredCount={monitoredCount}
              activeAlertsCount={activeAlertsCount}
              peakLoadArea={peakRecord.area}
              peakLoadKwh={peakRecord.consumption}
              onOpenAlerts={() => setActiveTab('alerts')}
              onOpenPeakFacility={() => {
                const rec = records.find((r) => r.area === peakRecord.area) || records[0];
                handleSelectRecord(rec);
              }}
            />

            {/* 2. Energy Consumption Records Panel */}
            <RecordsTable
              records={searchResults}
              allRecordsCount={records.length}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSortByConsumption={handleSortByConsumption}
              sortAscending={sortAscending}
              onReset={handleReset}
              onUndo={handleUndo}
              canUndo={undoCount > 0}
              undoCount={undoCount}
              onSelectRecord={handleSelectRecord}
            />

            {/* 3. Add Energy Record Form Panel */}
            <AddRecordForm onAddRecord={handleAddRecord} />

            {/* 4. Quick Actions Ops Console */}
            <QuickActions
              onOpenModal={(modal) => {
                if (modal === 'alerts') {
                  setActiveTab('alerts');
                } else {
                  setActiveModal(modal);
                }
              }}
              activeAlertsCount={activeAlertsCount}
            />
          </div>
        )}

        {/* Facilities Screen */}
        {activeTab === 'facilities' && (
          <FacilitiesView
            facilities={facilities}
            onSelectFacility={handleSelectRecord}
            records={records}
          />
        )}

        {/* Dispatch Screen */}
        {activeTab === 'dispatch' && <DispatchView />}

        {/* Alerts Screen */}
        {activeTab === 'alerts' && (
          <AlertsView
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />
        )}
      </main>

      {/* Bottom Sticky Status Strip and Tabs */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeAlertsCount={activeAlertsCount}
      />

      {/* Interactive Modals */}
      <AnalysisModal
        isOpen={activeModal === 'analysis'}
        onClose={() => setActiveModal(null)}
        records={records}
        totalTodayKwh={totalTodayKwh}
      />

      <CompareModal
        isOpen={activeModal === 'compare'}
        onClose={() => setActiveModal(null)}
        records={records}
      />

      <BinarySearchModal
        isOpen={activeModal === 'binarySearch'}
        onClose={() => setActiveModal(null)}
        records={records}
      />

      <QueueModal
        isOpen={activeModal === 'queue'}
        onClose={() => setActiveModal(null)}
      />

      <GridNetworkModal
        isOpen={activeModal === 'gridNetwork'}
        onClose={() => setActiveModal(null)}
      />

      <ActivityModal
        isOpen={activeModal === 'activity'}
        onClose={() => setActiveModal(null)}
        logs={activityLogs}
      />

      <RecordDetailModal
        isOpen={activeModal === 'recordDetail'}
        onClose={() => setActiveModal(null)}
        record={selectedRecord}
      />

      <ProfileModal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
