import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import ListItem from '../List/ListItem';
import listItemPropsHandler from '../../utils/list-item-props-handler';

const SortableItem = SortableElement((item, index, route, cardDesign, isDraggable) =>
  <ListItem
    {...listItemPropsHandler(item, index, route, cardDesign, isDraggable)}
  />
);

export default SortableItem;
