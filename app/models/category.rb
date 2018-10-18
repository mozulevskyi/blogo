class Category < ApplicationRecord
  validates :name, presence: true,
            length: { minimum: 2 }

  validates_each :name do |record, attr, value|
    record.errors.add(attr, 'must start with upper case ') if value.first =~ /\A[[:lower:]]/
  end

  validate :name_has_enough_words

  def name_has_enough_words
    return if name.blank?
    errors.add(:name, "must be at least 2 words") if name.split.size < 2
  end
end
