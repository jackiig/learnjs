describe('LearnJS', function() {
  it('can show a problem view', function() {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1);
  });
  it('shows the landing page view when there is no hash', function() {
    learnjs.showView('');
    expect($('.view-container .landing-view').length).toEqual(1);
  });
  it('passes the hash view parameter to the function', function() {
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });
  it('invokes the router when loaded', function() {
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });
  it('subscribes to the hash change event', function() {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });
  describe('problem view', function() {
    it('has a title that includes the problem number', function() {
      var view = learnjs.problemView('1');
      expect(view.text()).toContain('Problem #1');
      var view = learnjs.problemView('69');
      expect(view.text()).toContain('Problem #69');
    });
  });
});

describe('answer section', function() {
  it('can check a correct answer by hitting a button', function() {
    var view = learnjs.problemView('1');
    view.find('.answer').val('true');
    view.find('.check-btn').click();
    expect(view.find('.result').text()).toContain('Correct!');
  });
  it('can check a correct answer by hitting a button', function() {
    var view = learnjs.problemView('1');
    view.find('.answer').val('false');
    view.find('.check-btn').click();
    expect(view.find('.result').text()).toEqual('Incorrect!');
  });
});
