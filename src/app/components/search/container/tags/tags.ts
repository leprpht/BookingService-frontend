import { Component, computed, inject, input, signal } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TagOption } from '../../../../models/filters/tagOption';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'booking-service-search-container-tags',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSliderModule,
    MatButtonToggleModule,
  ],
  templateUrl: './tags.html',
  styleUrl: './tags.scss',
})
export class Tags {
  readonly form = input.required<FormGroup>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly tagInputControl = new FormControl<string>('');
  readonly announcer = inject(LiveAnnouncer);

  readonly selectedTags = signal<TagOption[]>([]);

  readonly allTags: TagOption[] = [
    { id: 'a1b2c3d4-0001-0000-0000-000000000000', name: 'Beachfront' },
    { id: 'a1b2c3d4-0002-0000-0000-000000000000', name: 'Pet-friendly' },
    { id: 'a1b2c3d4-0003-0000-0000-000000000000', name: 'Pool' },
    { id: 'a1b2c3d4-0004-0000-0000-000000000000', name: 'Spa' },
    { id: 'a1b2c3d4-0005-0000-0000-000000000000', name: 'Free parking' },
    { id: 'a1b2c3d4-0006-0000-0000-000000000000', name: 'Breakfast included' },
    { id: 'a1b2c3d4-0007-0000-0000-000000000000', name: 'City center' },
    { id: 'a1b2c3d4-0008-0000-0000-000000000000', name: 'Family-friendly' },
  ];

  readonly filteredTags = computed(() => {
    const query = (this.tagInputControl.value ?? '').toLowerCase();
    const selectedIds = new Set(this.selectedTags().map((t) => t.id));
    const available = this.allTags.filter((t) => !selectedIds.has(t.id));
    return query ? available.filter((t) => t.name.toLowerCase().includes(query)) : available;
  });

  get tagsControl(): FormControl<string[] | null> {
    return this.form().get('tags') as FormControl<string[] | null>;
  }

  removeTag(tag: TagOption): void {
    this.selectedTags.update((tags) => {
      const updated = tags.filter((t) => t.id !== tag.id);
      this.tagsControl.setValue(updated.map((t) => t.id));
      this.announcer.announce(`Removed ${tag.name}`);
      return updated;
    });
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    const tag: TagOption = event.option.value;

    if (!this.selectedTags().find((t) => t.id === tag.id)) {
      this.selectedTags.update((tags) => {
        const updated = [...tags, tag];
        this.tagsControl.setValue(updated.map((t) => t.id));
        return updated;
      });
    }

    this.tagInputControl.setValue('');
    event.option.deselect();
  }
}
