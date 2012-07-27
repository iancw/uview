class CreateSeats < ActiveRecord::Migration
  def change
    create_table :seats do |t|
      t.integer :state

      t.timestamps
    end
  end
end
