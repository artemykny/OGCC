import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import type { CaptchaPopupProps, ChallengeResult } from "../types";
import { ChallengePanel } from "./ChallengePanel";

type OrderingOption = {
  id: string;
  label: string;
  imageSrc?: string;
};

export type OrderingPopupProps = CaptchaPopupProps & {
  promptLabel: string;
  prompt: string;
  promptHint: string;
  options: OrderingOption[];
  correctOrder: string[];
};

export function OrderingPopup({
  promptLabel,
  prompt,
  promptHint,
  options,
  correctOrder,
  onComplete,
  onRefresh,
}: OrderingPopupProps) {
  const [orderedOptions, setOrderedOptions] = useState(options);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function finishSorting({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) {
      return;
    }

    setOrderedOptions((currentOptions) => {
      const oldIndex = currentOptions.findIndex(({ id }) => id === active.id);
      const newIndex = currentOptions.findIndex(({ id }) => id === over.id);
      return arrayMove(currentOptions, oldIndex, newIndex);
    });
    setHasInteracted(true);
  }

  function submitAnswer() {
    const selectedOrder = orderedOptions.map((option) => option.id);

    onComplete(scoreResult(selectedOrder, correctOrder));
  }

  return (
    <ChallengePanel
      promptLabel={promptLabel}
      prompt={prompt}
      promptHint={promptHint}
      submitDisabled={!hasInteracted}
      onSubmit={submitAnswer}
      onRefresh={onRefresh}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={finishSorting}
      >
        <SortableContext
          items={orderedOptions.map(({ id }) => id)}
          strategy={verticalListSortingStrategy}
        >
          <OrderingList>
            {orderedOptions.map((option, index) => (
              <SortableOrderingItem
                key={option.id}
                option={option}
                position={index + 1}
              />
            ))}
          </OrderingList>
        </SortableContext>
      </DndContext>
    </ChallengePanel>
  );
}

type SortableOrderingItemProps = {
  option: OrderingOption;
  position: number;
};

function SortableOrderingItem({
  option,
  position,
}: SortableOrderingItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });

  return (
    <OrderingItem
      ref={setNodeRef}
      $isDragging={isDragging}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <Position aria-hidden="true">{position}</Position>
      {option.imageSrc && <img src={option.imageSrc} alt="" />}
      <OptionLabel>{option.label}</OptionLabel>
      <DragHandle
        ref={setActivatorNodeRef}
        type="button"
        aria-label={`Reorder ${option.label}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical aria-hidden="true" />
      </DragHandle>
    </OrderingItem>
  );
}

function scoreResult(
  selectedOrder: string[],
  correctOrder: string[],
): ChallengeResult {
  const correctPositionCount = selectedOrder.filter(
    (optionId, index) => optionId === correctOrder[index],
  ).length;

  return {
    score: (correctPositionCount / correctOrder.length) * 2 - 1,
  };
}

const OrderingList = styled.ol`
  display: grid;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OrderingItem = styled.li<{ $isDragging: boolean }>`
  position: relative;
  z-index: ${({ $isDragging }) => ($isDragging ? 2 : 1)};
  display: flex;
  align-items: center;
  min-height: 52px;
  border: 1px solid ${({ $isDragging }) => ($isDragging ? "#4a90e2" : "#dfe1e5")};
  border-radius: 6px;
  background: #ffffff;
  box-shadow: ${({ $isDragging }) =>
    $isDragging ? "0 7px 18px rgba(60, 64, 67, 0.22)" : "0 1px 2px rgba(60, 64, 67, 0.08)"};
  opacity: ${({ $isDragging }) => ($isDragging ? 0.94 : 1)};
  padding: 6px 7px 6px 10px;
  user-select: none;
`;

const Position = styled.span`
  display: grid;
  flex: 0 0 27px;
  place-items: center;
  height: 27px;
  margin-right: 10px;
  border-radius: 50%;
  background: #eef4fe;
  color: #174ea6;
  font-size: 13px;
  font-weight: 700;
`;

const OptionLabel = styled.span`
  min-width: 0;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  overflow-wrap: anywhere;
`;

const DragHandle = styled.button`
  appearance: none;
  display: grid;
  flex: 0 0 38px;
  place-items: center;
  align-self: stretch;
  margin-left: 8px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #80868b;
  cursor: grab;
  padding: 0;
  touch-action: none;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    background: #f1f3f4;
    color: #3c4043;
  }

  &:focus-visible {
    outline: 2px solid #174ea6;
    outline-offset: -2px;
  }

  &:active {
    cursor: grabbing;
  }
`;
