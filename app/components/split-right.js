export default Ember.Component.extend({
  splitPercentage: Ember.computed.alias('parentView.splitPercentage'),
  sashWidthPercentage: Ember.computed.alias('parentView.sash.widthPercentage'),
  isVertical: Ember.computed.alias('parentView.isVertical'),
  childSplitView: null,

  didInsertElement: function() {
    this.set('parentView.right', this);
    this.$().css("position", "absolute");
    this.updateOrientation();
    this.updateLeft();
  },

  updateOrientation: function() {
    if(this.get('isVertical')) {
      this.$().css("right", "0");
      this.$().css("height", "100%");
    } else {
      this.$().css("bottom", "0");
      this.$().css("width", "100%");      
    }
  }.observes('isVertical'),

  updateChildSplitView: function() {
    var childSplit = this.get('childSplitView');

    if(childSplit) {
      childSplit.set('width', this.$().width());
      childSplit.set('height', this.$().height());
    }
  }.observes('childSplitView'),

  updateLeft: function() {
    var percent = this.get('splitPercentage') + this.get('sashWidthPercentage') / 2;
    
    if(this.get('isVertical'))
      this.$().css("left", percent + "%");
    else
      this.$().css("top", percent + "%");

    this.updateChildSplitView();
  }.observes('sashWidthPercentage', 'splitPercentage', 'isVertical')
});