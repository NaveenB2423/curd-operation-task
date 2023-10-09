import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj('DataService', ['getItems', 'addItem', 'deleteItem']);

    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [FormsModule], // Import FormsModule for ngModel bindings
      providers: [{ provide: DataService, useValue: mockDataService }],
    });

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch items on initialization', () => {
    const mockItems = [{ id: 1, title: 'Item 1', description: 'Description 1' }];
    mockDataService.getItems.and.returnValue(of(mockItems));

    fixture.detectChanges();

    expect(component.items).toEqual(mockItems);
  });

  it('should add an item', () => {
    const newItem = { id: 2, title: 'New Item', description: 'New Description' };
    mockDataService.addItem.and.returnValue(of(newItem));

    component.newItem = newItem;
    component.addItem();

    expect(component.items).toContain(newItem);
    expect(component.newItem).toEqual({ id: null, title: '', description: '' });
  });

  it('should delete an item', () => {
    const itemIdToDelete = 1;
    const mockItems = [
      { id: 1, title: 'Item 1', description: 'Description 1' },
      { id: 2, title: 'Item 2', description: 'Description 2' },
    ];
    component.items = mockItems;

    mockDataService.deleteItem.and.returnValue(of(null));

    component.deleteItem(itemIdToDelete);

    expect(component.items.length).toBe(1);
    expect(component.items.every((item) => item.id !== itemIdToDelete)).toBeTruthy();
  });

  it('should open the add item modal', () => {
    component.isEditModalOpen = false;

    component.openAdd();

    expect(component.isEditModalOpen).toBe(true);
  });
});
