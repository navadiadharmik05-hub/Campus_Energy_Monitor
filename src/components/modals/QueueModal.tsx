import React, { useState } from 'react';
import { X, Layers, Plus, Play } from 'lucide-react';
import { QueueTask } from '../../types';
import { INITIAL_QUEUE } from '../../data/mockData';
import { InspectionPriorityQueue } from '../../dsa/stackQueue';
import { EnergyRecord } from '../../dsa/energyRecord';

interface QueueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QueueModal: React.FC<QueueModalProps> = ({ isOpen, onClose }) => {
  // Instantiate priority queue instance from InspectionPriorityQueue
  const [priorityQueue] = useState<InspectionPriorityQueue>(() => {
    const pq = new InspectionPriorityQueue();
    INITIAL_QUEUE.forEach((task) => {
      const rec = new EnergyRecord(
        task.id,
        task.area,
        'LoadShed',
        task.targetReduction,
        task.enqueuedAt
      );
      rec.priority = task.priority;
      pq.insert(rec);
    });
    return pq;
  });

  const [, setTick] = useState(0);
  const forceUpdate = () => setTick((t) => t + 1);

  const [newArea, setNewArea] = useState('');
  const [newKwh, setNewKwh] = useState('150');
  const [newPriority, setNewPriority] = useState<number>(2);

  if (!isOpen) return null;

  const tasks: QueueTask[] = priorityQueue.toArray().map((rec: any) => ({
    id: String(rec.id),
    priority: rec.priority,
    area: rec.area,
    targetReduction: rec.consumption,
    status: 'Pending',
    enqueuedAt: rec.date || 'Just now',
  }));

  const handleEnqueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArea.trim()) return;

    const rec = new EnergyRecord(
      `task-${Date.now().toString().slice(-4)}`,
      newArea.trim(),
      'LoadShed',
      Number(newKwh) || 100,
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    rec.priority = Number(newPriority);

    priorityQueue.insert(rec);
    setNewArea('');
    forceUpdate();
  };

  const handleExecuteNext = () => {
    if (!priorityQueue.isEmpty()) {
      priorityQueue.extractMin();
      forceUpdate();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="queue-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1c2028] border border-[#31353e] rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-[#dfe2ee]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#71f8e4]/20 border border-[#71f8e4]/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#71f8e4]" />
            </div>
            <div>
              <h3 id="queue-modal-title" className="font-['Space_Grotesk'] text-lg font-semibold text-[#dfe2ee]">
                Operational Dispatch Queue · Min-Heap / Priority Queue
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#d8c3ad]/70">
                Priority-driven load shedding queue · InspectionPriorityQueue insert/extractMin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#d8c3ad] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Queue Control Strip */}
        <div className="flex items-center justify-between bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60">
          <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#71f8e4] animate-pulse"></span>
            <span>Queue Length: <strong>{tasks.length} tasks</strong></span>
          </div>
          <button
            onClick={handleExecuteNext}
            disabled={tasks.length === 0}
            className="px-3 py-1.5 bg-[#04b4a2] hover:bg-[#4fdbc8] disabled:opacity-40 text-[#003731] font-['JetBrains_Mono'] font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Dispatch Top Priority (P1)</span>
          </button>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-2">
          {tasks.length === 0 ? (
            <div className="p-4 text-center text-xs font-['JetBrains_Mono'] text-[#d8c3ad]/60 bg-[#262a33] rounded-lg">
              Inspection Priority Queue is empty. Enqueue tasks below.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-[#262a33] border border-[#31353e]/60 rounded-lg flex items-center justify-between gap-3 text-xs font-['JetBrains_Mono']"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] ${
                    task.priority === 1
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : task.priority === 2
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-[#56e5a9]/20 text-[#56e5a9] border border-[#56e5a9]/30'
                  }`}>
                    P{task.priority}
                  </span>
                  <div>
                    <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#dfe2ee]">
                      {task.area}
                    </div>
                    <div className="text-[11px] text-[#d8c3ad]/70">
                      Target reduction: -{task.targetReduction} kWh · Enqueued: {task.enqueuedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    task.status === 'Executed'
                      ? 'bg-[#56e5a9]/20 text-[#56e5a9]'
                      : task.status === 'In Progress'
                      ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                      : 'bg-[#31353e] text-[#d8c3ad]'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enqueue New Task Form */}
        <form onSubmit={handleEnqueue} className="bg-[#262a33] p-3 rounded-lg border border-[#31353e]/60 flex flex-col gap-2.5">
          <span className="font-['Space_Grotesk'] text-xs font-semibold text-[#dfe2ee]">
            Enqueue Load Shedding Priority Task
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              required
              placeholder="Facility area (e.g. West Quad AC)"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              className="px-2.5 py-1.5 bg-[#1c2028] border border-[#31353e] rounded text-xs text-[#dfe2ee] focus:outline-none focus:border-[#71f8e4]"
            />
            <input
              type="number"
              required
              placeholder="kW reduction"
              value={newKwh}
              onChange={(e) => setNewKwh(e.target.value)}
              className="px-2.5 py-1.5 bg-[#1c2028] border border-[#31353e] rounded text-xs text-[#dfe2ee] font-['JetBrains_Mono'] focus:outline-none focus:border-[#71f8e4]"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(Number(e.target.value))}
              className="px-2.5 py-1.5 bg-[#1c2028] border border-[#31353e] rounded text-xs text-[#dfe2ee] font-['JetBrains_Mono'] focus:outline-none focus:border-[#71f8e4]"
            >
              <option value={1}>P1 - Immediate / Critical</option>
              <option value={2}>P2 - Elevated Reserve</option>
              <option value={3}>P3 - Scheduled Optimization</option>
            </select>
          </div>
          <button
            type="submit"
            className="self-end px-3 py-1.5 bg-[#71f8e4] hover:bg-[#4fdbc8] text-[#00201c] font-['JetBrains_Mono'] font-bold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enqueue Task · InspectionPriorityQueue</span>
          </button>
        </form>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#31353e] hover:bg-[#353942] text-[#dfe2ee] font-['JetBrains_Mono'] text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close Queue
          </button>
        </div>
      </div>
    </div>
  );
};
