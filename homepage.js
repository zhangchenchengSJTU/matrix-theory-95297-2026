const courseTabs = Array.from(document.querySelectorAll('.course-tabs [role="tab"]'));

function selectCourseTab(selected) {
  for (const tab of courseTabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.setAttribute('aria-hidden', String(!active));
    panel.inert = !active;
    panel.tabIndex = active ? 0 : -1;
  }
}

for (const tab of courseTabs) {
  tab.addEventListener('click', () => selectCourseTab(tab));
  tab.addEventListener('keydown', event => {
    const index = courseTabs.indexOf(tab);
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % courseTabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + courseTabs.length) % courseTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = courseTabs.length - 1;
    else return;
    event.preventDefault();
    selectCourseTab(courseTabs[next]);
    courseTabs[next].focus();
  });
}
